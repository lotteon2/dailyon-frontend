<template>
  <div class="chat-container">
    <h1>Chatting</h1>
    <div class="messages">
      <div class="message" v-for="(msg, index) in messages" :key="index">
        <div class="meta-info">
          <span class="user">{{ msg.user.nickname }}</span>
          <span class="timestamp">{{ msg.timestamp }}</span>
        </div>
        <p class="content">{{ msg.content }}</p>
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="newMessage" @keyup.enter="send" />
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Buffer } from 'buffer'
import { RSocketConnector } from 'rsocket-core'
import { WebsocketClientTransport } from 'rsocket-websocket-client'
import type { RSocket, Payload } from 'rsocket-core'

interface Message {
  user: User
  content: string
  timestamp: string
}

interface User {
  id: number
  nickname: string
}
const requester = ref()
const newMessage = ref<string>('')
const messages = ref<Message[]>([])
const message = ref<Message>()
const user = ref<User>({
  id: Math.floor(Math.random() * 10000 + 1),
  nickname: 'nick:' + Math.floor(Math.random() * 10000 + 1)
})
const rsocket = ref<RSocket>()
const connector = ref<RSocketConnector>()

onMounted(async () => {
  connector.value = new RSocketConnector({
    setup: {
      keepAlive: 100,
      lifetime: 10000,
      dataMimeType: 'application/json',
      metadataMimeType: 'message/x.rsocket.routing.v0',
      payload: {
        data: Buffer.from(JSON.stringify(user.value))
      }
    },
    transport: new WebsocketClientTransport({
      url: 'ws://localhost:6777/rs',
      wsCreator: (url) => new WebSocket(url) as any
    })
  })
  const rsocket = await connector.value.connect()

  await new Promise((resolve, reject) => {
    const requester = rsocket.requestChannel(
      {
        data: Buffer.from('Hello World')
      },
      1,
      false,
      {
        onError: (e) => reject(e),
        onNext: (payload, isComplete) => {
          console.log(`payload[data: ${payload.data}; metadata: ${payload.metadata}]|${isComplete}`)

          requester.request(1)

          if (isComplete) {
            resolve(payload)
          }
        },
        onComplete: () => {
          resolve(null)
        },
        onExtension: () => {},
        request: (n) => {
          console.log(`request(${n})`)
          requester.onNext(
            {
              data: Buffer.from('Message')
            },
            true
          )
        },
        cancel: () => {}
      }
    )
  })
})

// onMounted(async () => {
//   connector.value = new RSocketConnector({
//     setup: {
//       keepAlive: 100,
//       lifetime: 10000,
//       dataMimeType: 'application/json',
//       metadataMimeType: 'message/x.rsocket.routing.v0',
//       payload: {
//         data: Buffer.from(JSON.stringify(user.value))
//       }
//     },
//     transport: new WebsocketClientTransport({
//       url: 'ws://localhost:6777/rs'
//       // wsCreator: (url) => new WebSocket(url) as any
//     })
//   })

//   rsocket.value = await connector.value.connect()
//   const requester = rsocket.value.requestChannel(
//     {
//       data: Buffer.from(''),
//       metadata: Buffer.from(String.fromCharCode('chat.message'.length) + 'chat.message')
//     },
//     2147483647,
//     true,
//     {
//       onError: (e: any) => {
//         console.error('Connection has been closed due to:', e)
//       },
//       onNext: (payload, isComplete) => {
//         console.log(`payload[data: ${payload.data}; metadata: ${payload.metadata}]|${isComplete}`)
//         if (isComplete) {
//         }
//       },
//       onComplete: () => {},
//       onExtension: () => {},
//       request: (n) => {
//         console.log(`request(${n})`)
//         console.log(requester)
//         // requester.value.onNext(
//         //   {
//         //     data: Buffer.from(JSON.stringify(message)),
//         //     metadata: Buffer.from(String.fromCharCode('receive'.length) + 'receive')
//         //   },
//         //   true
//         // )
//       },
//       cancel: () => {}
//     }
//   )
// })
// const send = () => {
//   if (!newMessage.value.trim()) {
//     alert('메세지를 입력해주세요')
//     return
//   }
//   if (rsocket.value) {
//     const timestamp = new Date().toLocaleTimeString()
//     const message: Message = {
//       user: user.value,
//       content: newMessage.value,
//       timestamp: timestamp
//     }
//     rsocket.value.requestChannel(
//       {
//         data: Buffer.from(JSON.stringify(message)),
//         metadata: Buffer.from(String.fromCharCode('chat.message'.length) + 'chat.message')
//       },
//       2147483647,
//       true,
//       {
//         onError: (e: any) => {
//           console.error('Connection has been closed due to:', e)
//         },
//         onNext: (payload, isComplete) => {
//           console.log(`payload[data: ${payload.data}; metadata: ${payload.metadata}]|${isComplete}`)
//           if (isComplete) {
//             messages.value.push(message)
//             newMessage.value = ''
//           }
//         },
//         onComplete: () => {},
//         onExtension: () => {},
//         request: (n) => {
//           console.log(`request(${n})`)
//           // requester.value.onNext(
//           //   {
//           //     data: Buffer.from(JSON.stringify(message)),
//           //     metadata: Buffer.from(String.fromCharCode('receive'.length) + 'receive')
//           //   },
//           //   true
//           // )
//         },
//         cancel: () => {}
//       }
//     )
//     newMessage.value = ''
//   }
// }
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  margin-bottom: 5px;
}

.user {
  font-weight: bold;
}

.timestamp {
  color: #999;
}

.input-container {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.input-container input {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
}

.input-container button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #4cae4c;
}
</style>
