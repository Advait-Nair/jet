import { writable, type Writable } from "svelte/store";

export enum NotifyLevel {
    Info, Success, Warning, Error
}

export const notifyIcons: Record<NotifyLevel, string> = {
	[NotifyLevel.Info]: 'info',
	[NotifyLevel.Success]: 'check',
	[NotifyLevel.Warning]: 'warning',
	[NotifyLevel.Error]: 'emergency_home',
};

const timeouts: any[] = [];
export function notifyUser(notificationWritable:Writable<any>, title: string, message: string, level: NotifyLevel = NotifyLevel.Info, timeout = message.length * 80) {

    timeouts.forEach(clearTimeout);

    notificationWritable.set({title, level, message, visible: true});


    timeouts.push(setTimeout(() => {
        notificationWritable.update(d => ({ ...d, visible: false }));
    }, timeout));
}