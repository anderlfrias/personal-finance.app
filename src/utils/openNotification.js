import { Notification, toast } from 'components/ui'

// const types = ["info","success","warning","danger"];
function notification(title) {
    toast.push(
        <Notification
            title={title}
            closable={true}
        />
    )
}

function notificationType(text, type) {
    toast.push(
        <Notification
            type={type}
            title={text}
            closable={true}
        />
    )
}

function notificationWithSubtitle(text, subtitle) {
    toast.push(
        <Notification
            title={text}
            closable={true}
        >
            {subtitle}
        </Notification>
    )
}

export default function openNotification ({ title, type = null, subtitle = null }) {
    console.log(title, type, subtitle)

    if (!title) return
    if (!type && !subtitle) return notification(title)
    if (type && !subtitle) return notificationType(title, type)
    if (!type && subtitle) return notificationWithSubtitle(title, subtitle)

    return toast.push(
        <Notification
            title={title}
            type={type}
            closable={true}
        >
            {subtitle}
        </Notification>
    )
}