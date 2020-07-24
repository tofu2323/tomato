<template>
  <TCard>
    <THeading2>{{ taskBucket.name }}</THeading2>
    <TInputWithButton
      @click-button="addTask"
      placeholder="New Task"
      button-text="Add"
    />
    <TaskCardCurrentTask
      class="mt-4"
      v-if="currentTask"
      :task="currentTask"
      @stop="stopTask(currentTask)"
      @finish="finishTask(currentTask)"
    />
    <ul v-if="rawTasks.length">
      <TaskCardListItem
        v-for="(task, index) in orderedTasks"
        class="mt-4"
        :key="index"
        :task="task"
        @start="startTask(task)"
        @finish="finishTask(task)"
      />
    </ul>
  </TCard>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import TInputWithButton from "~/components/TInputWithButton.vue";
import THeading2 from "~/components/THeading2.vue";
import THeading3 from "~/components/THeading3.vue";
import TButtonPrimary from "~/components/TButtonPrimary.vue";
import TaskCardListItem from "~/components/TaskCardListItem.vue";
import firebase from "firebase";
import TaskCardCurrentTask from "~/components/TaskCardCurrentTask.vue";
import TCard from "~/components/TCard.vue";
import { TaskBucket } from "~/pages/_roomId/index.vue";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import CollectionReference = firebase.firestore.CollectionReference;
import DocumentData = firebase.firestore.DocumentData;

export class Task {
  private constructor(
    public id: string | undefined = undefined,
    public title: string,
    public isDoing: boolean,
    public startedAt: number,
    public timeTaken: number,
    public finishedAt: number,
    public createdAt: number
  ) {}

  static fromDoc(doc: QueryDocumentSnapshot) {
    const data = doc.data();
    return new Task(
      doc.id,
      data.title,
      data.isDoing,
      data.startedAt,
      data.timeTaken,
      data.finishedAt,
      data.createdAt
    );
  }

  static fromCreate(title: string) {
    return new Task(undefined, title, false, 0, 0, 0, Date.now());
  }

  asDoc() {
    const po = { ...this };
    delete po.id;
    return po;
  }

  get timeTakenSec(): number {
    return Number((((this.timeTaken || 0) % 60000) / 1000).toFixed(0));
  }

  start() {
    this.startedAt = Date.now();
    this.isDoing = true;
  }

  stop() {
    this.isDoing = false;
    if (this.startedAt > 0) {
      this.timeTaken = (this.timeTaken || 0) + (Date.now() - this.startedAt);
      this.startedAt = 0;
    }
  }

  finish() {
    this.stop();
    this.finishedAt = Date.now();
  }
}

export default Vue.extend({
  components: {
    TCard,
    TaskCardCurrentTask,
    TaskCardListItem,
    TButtonPrimary,
    THeading3,
    TInputWithButton,
    THeading2,
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
    taskBucket: {
      type: Object as PropType<TaskBucket>,
      required: true,
    },
  },
  data: () => ({
    rawTasks: [] as Array<Task>,
    currentTask: null as Task | null,
    listeners: [] as Array<Function>,
  }),
  computed: {
    tasksRef(): CollectionReference<DocumentData> {
      return this.$fireStore
        .collection("rooms")
        .doc(this.roomId)
        .collection("taskBuckets")
        .doc(this.taskBucket.id)
        .collection("tasks");
    },
    orderedTasks(): Array<Task> {
      return this.rawTasks.sort((a, b) => b.createdAt - a.createdAt);
    },
  },
  methods: {
    addTask(title: string): void {
      this.tasksRef.add(Task.fromCreate(title).asDoc());
    },
    startTask(task: Task): void {
      if (this.currentTask) {
        this.currentTask.stop();
        this.tasksRef.doc(this.currentTask.id).set(this.currentTask.asDoc());
      }
      task.start();
      this.tasksRef.doc(task.id).set(task.asDoc());
    },
    stopTask(task: Task): void {
      task.stop();
      this.tasksRef.doc(task.id).set(task.asDoc());
    },
    finishTask(task: Task): void {
      task.finish();
      this.tasksRef.doc(task.id).set(task.asDoc());
    },
    startAllListener(): void {
      this.listeners.push(
        this.tasksRef
          .where("finishedAt", "==", 0)
          .where("isDoing", "==", false)
          .onSnapshot(
            (tasksSnapshot) => {
              tasksSnapshot.docChanges().forEach((change) => {
                const task: Task = Task.fromDoc(change.doc);
                if (change.type === "added") {
                  this.rawTasks.push(task);
                }
                if (change.type === "modified") {
                }
                if (change.type === "removed") {
                  this.rawTasks = this.rawTasks.filter((_) => _.id !== task.id);
                }
              });
            },
            (error) => console.error(error)
          )
      );
    },
    startCurrentTaskListener(): void {
      this.listeners.push(
        this.tasksRef
          .where("finishedAt", "==", 0)
          .where("isDoing", "==", true)
          .orderBy("startedAt", "desc")
          .limit(1)
          .onSnapshot(
            (tasksSnapshot) => {
              tasksSnapshot.docChanges().forEach((change) => {
                const task: Task = Task.fromDoc(change.doc);
                if (change.type === "added") {
                  this.currentTask = task;
                }
                if (change.type === "modified") {
                  this.currentTask = task;
                }
                if (change.type === "removed") {
                  this.currentTask = null;
                }
              });
            },
            (error) => console.error(error)
          )
      );
    },
  },
  mounted(): void {
    this.startAllListener();
    this.startCurrentTaskListener();
  },
  beforeDestroy(): void {
    this.listeners.forEach((_) => _());
  },
});
</script>
