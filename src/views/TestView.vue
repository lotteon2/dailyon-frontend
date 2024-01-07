<template>
  <div>
    <h1>Chatting</h1>
    <input type="text" v-model="message" />
    <button @click="send">전송</button>
    <ul>
      <li v-for="item in messages" :key="item.id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Buffer } from 'buffer'
import { RSocketConnector } from 'rsocket-core'
import { WebsocketClientTransport } from 'rsocket-websocket-client'
import type { RSocket, Payload } from 'rsocket-core'

const connector = ref<RSocketConnector>()
const rsocket = ref<RSocket>()
onMounted(async () => {
  connector.value = new RSocketConnector({
    setup: {
      keepAlive: 100,
      lifetime: 10000,
      dataMimeType: 'application/json',
      metadataMimeType: 'message/x.rsocket.routing.v0'
    },
    transport: new WebsocketClientTransport({
      url: 'ws://localhost:6777/rs',
      wsCreator: (url) => new WebSocket(url) as any
    })
  })
  rsocket.value = await connector.value.connect()
  //   await new Promise((resolve, reject) => {
  //     const requester = rsocket.requestChannel(
  //       {
  //         data: Buffer.from('Hello World')
  //       },
  //       1,
  //       false,
  //       {
  //         onError: (e) => reject(e),
  //         onNext: (payload, isComplete) => {
  //           console.log(`payload[data: ${payload.data}; metadata: ${payload.metadata}]|${isComplete}`)

  //           requester.request(1)

  //           if (isComplete) {
  //             resolve(payload)
  //           }
  //         },
  //         onComplete: () => {
  //           resolve(null)
  //         },
  //         onExtension: () => {},
  //         request: (n) => {
  //           console.log(`request(${n})`)
  //           requester.onNext(
  //             {
  //               data: Buffer.from('Message')
  //             },
  //             true
  //           )
  //         },
  //         cancel: () => {}
  //       }
  //     )
  //   })
})

const send = () => {
  if (rsocket.value) {
    rsocket.value.requestResponse(
      {
        data: Buffer.from('message'),
        metadata: Buffer.from(String.fromCharCode('message'.length) + 'message')
      },
      {
        onComplete: () => {
          console.log('com')
        },
        onError: (error) => {
          console.log(error)
        },
        onNext: (payload) => {
          console.log(payload.data)
        },
        onExtension: () => {
          console.log('onExtension')
        }
      }
    )
  }
}
</script>

<style scoped></style>
