<template>
  <div class="">
    <section class="">
      <TContainer class="flex items-center justify-center">
        <TCard>
          <THeading2>Create Room</THeading2>
          <TInputWithButton
            placeholder="New room"
            buttonText="Create"
            @click-button="createRoom"
          ></TInputWithButton>
        </TCard>
      </TContainer>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TContainer from "~/components/TContainer.vue";
import TCard from "~/components/TCard.vue";
import THeading2 from "~/components/THeading2.vue";
import TInputWithButton from "~/components/TInputWithButton.vue";
import firebase from "firebase";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export interface RoomDoc {
  name: string;
  createdAt: number;
}

export class Room implements RoomDoc {
  private constructor(
    public id: string | undefined = undefined,
    public name: string,
    public createdAt: number
  ) {}

  static fromDoc(doc: QueryDocumentSnapshot) {
    const data = doc.data() as RoomDoc;
    return new Room(doc.id, data.name, data.createdAt);
  }

  static fromCreate(name: string): Room {
    return new Room(undefined, name, Date.now());
  }

  asDoc(): RoomDoc {
    const po = { ...this };
    delete po.id;
    return po;
  }
}

export default Vue.extend({
  components: { THeading2, TCard, TContainer, TInputWithButton },
  methods: {
    createRoom(text: string): void {
      this.$fireStore
        .collection("rooms")
        .add(Room.fromCreate(text).asDoc())
        .then((doc) => {
          this.$router.push({
            name: "roomId",
            params: {
              roomId: doc.id,
            },
          });
        });
    },
  },
  mounted(): void {
    // this.$fireAnalytics.logEvent('top');
  },
});
</script>
