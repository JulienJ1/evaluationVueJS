<template>
  <b-container>
    <b-row>
      <b-col class="mt-5">
        <h3>Dashboard</h3>
      </b-col>
    </b-row>
    <hr>

    <b-row class="mb-4">
      <b-col lg="5">
        <b-card class="shadow p-3 h-100">
          Graph Stats here
        </b-card>
      </b-col>

      <b-col lg="7">
        <b-card class="shadow p-3 h-100" title="Les 3 Dernières Factures">
          <!-- Exercice :

              Afficher ici le json des factures qui proviennent du store.
            -->
          <b-table
              id="bills-table"
              :current-page="1"
              :per-page="3"
              stacked="lg"
              :fields="fields"
              :items="bills">

            <template #cell(client)="row">
              {{row.value.firstname }} {{row.value.lastname }}
            </template>

            <template #cell(actions)="row">
              <b-button variant="light" size="md" :to="{ name: 'edition-facture', params: { id: row.item._id } }">
                <i class="fa-fw fas fa-pen mr-2 text-primary" /> Modifier
              </b-button>
            </template>

          </b-table>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="5">
        <b-card class="shadow p-3 mb-4">
          <h3>Exemple counter:</h3>

          <p class="h1 text-center">{{ counter }}</p>
          <div class="d-flex justify-content-center mt-4">
            <b-button @click="onAddCounter(-1)">- 1 au compteur</b-button>
            <b-button class="ml-2" @click="onAddCounter(1)">+ 1 au compteur</b-button>
          </div>
        </b-card>

      </b-col>
      <b-col lg="7">
        <b-card class="shadow p-3 mb-4" title="Les 3 Derniers clients">
          <b-table
              id="bills-table"
              :current-page="1"
              :per-page="3"
              stacked="lg"
              :fields="fieldsClient"
              :items="clients">

            <template #cell(client)="row">
              {{row.value.firstname }} {{row.value.lastname }}
            </template>

            <template #cell(actions)="row">
              <b-button variant="light" size="md" :to="{ name: 'edition-client', params: { id: row.item._id } }">
                <i class="fa-fw fas fa-pen mr-2 text-primary" /> Modifier
              </b-button>
            </template>

          </b-table>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

import {mapState, mapActions} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    // mapState récupère la donnée bills du store dans le module bill
    // map `this.bills` avec `this.$store.bill.bills`
    ...mapState({
      bills: state => state.bill.bills,
      clients: state => state.client.clients

    }),

    // utilisation du store principal (sans utiliser de module)
    // map `this.counter` avec this.$store.state.counter`
    counter() {
      return this.$store.state.counter
    }
  },
  data() {
    return {
      fields: [
        {
          key: 'billNumber',
          label: 'N°',
          class: 'cell-idbill',
          sortable: true
        },
        {
          key: 'client',
          label: 'Client',
          class: 'cell-client',
          sortable: true
        },
        {
          key: 'montantHT',
          label: 'Montant HT',
          class: 'cell-montant-ht',
          sortable: false,
          formatter: (value, key, item) => {
            return (this.getTotalHTForBill(item)).toFixed(2) + ' HT'
          }
        },
        {
          key: 'montantTTC',
          label: 'Montant TTC',
          class: 'cell-montant-ttc',
          sortable: false,
          formatter: (value, key, item) => {
            return (this.getTotalTTCForBill(item)).toFixed(2) + ' TTC'
          }
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'cell-actions',
          sortable: false
        }
      ],
      fieldsClient: [
        {
          key: 'firstname',
          label: 'Prénom',
          class: 'cell-client',
          sortable: true
        },
        {
          key: 'lastname',
          label: 'Nom',
          class: 'cell-lastname',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          class: 'cell-email',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'cell-actions',
          sortable: false
        }
      ]
    }
  },
  methods: {
    ...mapActions('bill', ['getBills']),
    ...mapActions('client', ['getClients']),

    onAddCounter(num){
      // on doit déclencher une action dans le store
      // pour mettre à jour la donnée
      this.$store.dispatch('updateCounter', num)
    },
    getTotalHTForBill(item){
      let total = 0
      if(item.prestations.length > 0){
        for (const prestation of item.prestations) {
          if(prestation.qty > 0) {
            let calc = prestation.qty * prestation.price
            total += calc
          }
        }
      }
      total -= item.discount

      return total
    },
    getTotalTTCForBill(item){
      const totalHT = this.getTotalHTForBill(item)
      const totalTVA = item.tva ? (totalHT * item.tvaRate) / 100 : 0

      return totalTVA + totalHT
    }
  },
  created() {
    //pour déclencher le console log, on attend la réponse du serveur (il faut retourner la promesse depuis le store)
    this.getBills()
    this.getClients()
  }
}
</script>

<style scoped>

</style>
