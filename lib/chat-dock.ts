// Window events that connect the chat launchers (the pixel sprite, homepage buttons) to the
// site-wide chat dock (app/components/chat/ChatDock.tsx) without shared React state.

export const CHAT_DOCK_OPEN = "chatdock:open";
export const CHAT_DOCK_TOGGLE = "chatdock:toggle";
export const CHAT_DOCK_STATE = "chatdock:state";

export type ChatDockOpenDetail = { question?: string };
export type ChatDockStateDetail = { open: boolean };

/** Opens the dock, optionally asking a question right away. */
export function openChatDock(question?: string) {
  window.dispatchEvent(new CustomEvent<ChatDockOpenDetail>(CHAT_DOCK_OPEN, { detail: { question } }));
}

export function toggleChatDock() {
  window.dispatchEvent(new Event(CHAT_DOCK_TOGGLE));
}
