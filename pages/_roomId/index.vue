<template>
  <div class="">
    <section class="">
      <TContainer>
        <THeading3>Room of {{ room.name }}</THeading3>
        <TCard>
          <TInputWithButton
            placeholder="New TaskBucket"
            buttonText="Add"
            @click-button="addTaskBucket"
          ></TInputWithButton>
        </TCard>
      </TContainer>
    </section>
    <section class="mt-10">
      <TContainer class="flex items-center justify-center">
        <ul class="flex flex-wrap justify-center sm:justify-start w-full">
          <li v-for="taskBucket in taskBuckets" class="p-1 sm:w-1/2">
            <TodoCard
              class="w-full"
              :room-id="room.id"
              :task-bucket="taskBucket"
            />
          </li>
        </ul>
      </TContainer>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoCard from "~/components/TaskCard.vue";
import TContainer from "~/components/TContainer.vue";
import { Room, RoomDoc } from "~/pages/index.vue";
import THeading3 from "~/components/THeading3.vue";
import TInputWithButton from "~/components/TInputWithButton.vue";
import firebase from "firebase";
import TCard from "~/components/TCard.vue";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import CollectionReference = firebase.firestore.CollectionReference;
import DocumentData = firebase.firestore.DocumentData;

export interface TaskBucketDoc {
  name: string;
  createdAt: number;
}

export class TaskBucket implements TaskBucketDoc {
  private constructor(
    public id: string | undefined = undefined,
    public name: string,
    public createdAt: number
  ) {}

  static fromDoc(doc: QueryDocumentSnapshot): TaskBucket {
    const data = doc.data() as RoomDoc;
    return new TaskBucket(doc.id, data.name, data.createdAt);
  }

  static fromCreate(name: string): TaskBucket {
    return new TaskBucket(undefined, name, Date.now());
  }
  asDoc(): RoomDoc {
    const po = { ...this };
    delete po.id;
    return po;
  }
}
export default Vue.extend({
  components: { TCard, THeading3, TInputWithButton, TContainer, TodoCard },
  async asyncData({ app, route, error }): Promise<{ room: Room }> {
    const room = await app.$fireStore
      .collection("rooms")
      .doc(route.params.roomId)
      .get()
      .then((docSnapshot) => {
        return Room.fromDoc(docSnapshot);
      });
    if (!room) {
      error({ statusCode: 404 });
    }
    return {
      room: room,
    };
  },
  data() {
    return {
      taskBuckets: [] as Array<TaskBucket>,
      listeners: [] as Array<Function>,
    };
  },
  computed: {
    taskBucketsRef(): CollectionReference<DocumentData> {
      return (
        this.$fireStore
          .collection("rooms")
          // @ts-ignore
          .doc(this.room.id)
          .collection("taskBuckets")
      );
    },
  },
  methods: {
    startTaskBucketsListener(): void {
      this.listeners.push(
        this.taskBucketsRef.orderBy("createdAt").onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const taskBucket: TaskBucket = TaskBucket.fromDoc(change.doc);
              if (change.type === "added") {
                this.taskBuckets.push(taskBucket);
              }
              if (change.type === "modified") {
              }
              if (change.type === "removed") {
                this.taskBuckets = this.taskBuckets.filter(
                  (_) => _.id !== taskBucket.id
                );
              }
            });
          },
          (error) => console.error(error)
        )
      );
    },
    addTaskBucket(name: string): void {
      this.taskBucketsRef.add(TaskBucket.fromCreate(name).asDoc()).then();
    },
  },
  mounted(): void {
    this.startTaskBucketsListener();
  },
  beforeDestroy(): void {
    this.listeners.forEach((_) => _());
  },
});
</script>
