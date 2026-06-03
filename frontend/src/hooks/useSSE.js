import { useEffect, useRef, useCallback } from "react";

export function useSSE(onEvent) {
  const eventSourceRef = useRef(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const reconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource("/api/events");
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onEventRef.current?.(data);
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      es.close();
      setTimeout(reconnect, 5000);
    };
  }, []);

  useEffect(() => {
    reconnect();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [reconnect]);

  return { reconnect };
}
