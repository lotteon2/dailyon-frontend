declare module 'event-source-polyfill' {
  export class EventSourcePolyfill extends EventSource {
    constructor(url: string, eventSourceInitDict?: EventSourceInitDict)
  }

  interface EventSourceInitDict {
    headers?: Record<string, string>
    withCredentials?: boolean
  }
}
