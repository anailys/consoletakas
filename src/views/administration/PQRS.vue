<template>
  <v-container>
    <v-row>
      <v-col cols="10" offset="1">
        <v-card>
          <v-card-title class="justify-center">Buzón de mensajes</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- Para md en adelante -->

            <v-row>
              <v-col cols="12" md="6">
                <v-tabs>
                  <v-tab>Sin responder</v-tab>
                  <v-tab>Respondidos</v-tab>
                  <v-tab>Archivados</v-tab>
                </v-tabs>
                <v-list>
                  <v-list-item-group>
                    <div
                      v-for="(message, i) in messages"
                      :key="'message_' + i"
                      @click="clicked_message = i"
                    >
                      <v-list-item @click="openDialog()">
                        <v-list-item-content>
                          <v-list-item-title>
                            <b>{{ message.name }}</b
                            ><br />
                            {{ message.email }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-icon
                            v-text="'mdi-delete'"
                            @click="deleteItem(i, message.id)"
                          ></v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                      <v-divider></v-divider>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6" class="d-none d-sm-block">
                <v-card>
                  <AnswerComponent
                    v-if="messages.length > 0"
                    :message="messages[clicked_message]"
                    :messageClicked="clicked_message"
                  />
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog class="d-none" v-model="dialog" persistent>
      <v-card>
        <AnswerComponent
          v-if="messages.length > 0"
          :message="messages[clicked_message]"
          :messageClicked="clicked_message"
        />
        <v-card-actions>
          <v-btn block color="black" class="white--text" @click="dialog = false"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import AnswerComponent from "../../components/messages/AnswerComponent.vue";
import AdministrationServices from "../../services/administration/AdministrationServices";
export default {
  name: "Messages",
  components: { AnswerComponent: AnswerComponent },
  async mounted() {
    let response = await AdministrationServices.pqrs.getPqrs();
    this.messages = response.data.data;
    console.log(this.messages);
  },
  data: () => ({
    dialog: false,
    messages: [],
    clicked_message: 0,
  }),
  methods: {
    openDialog() {
      this.dialog = navigator.userAgentData == undefined ? true : false;
    },
    deleteItem() {
      console.log(this.messages[this.clicked_message]);
    },
  },
};
</script>
