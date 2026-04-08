import PusherServer from 'pusher'
import PusherClient from 'pusher-js'
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
});

const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

const presenceInstance = (user) => {
    const instance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth/channel`,
        auth: {
            params: {
                user_id: user?._id,
                email: user?.email
            }
        }
    });
    return instance
}

// For beams push notifications
const initBeamsClient = async () => {
    const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID,
    });

    beamsClient.start()
        .then(() => beamsClient.addDeviceInterest('@_urbanfits_admin_notifications'))
        .then(() => console.log('Admin subscribed with admin beams successfully!'))
        .catch(console.error);
}

export { pusherServer, pusherClient, presenceInstance, initBeamsClient }