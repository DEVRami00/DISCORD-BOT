const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const activities = [
            { name: 'no se que poner la ptm', type: 0 }, // 0: Playing
            { name: 'no se que poner la ptm', type: 3 }, // 3: Watching
            { name: 'no se que poner la ptm', type: 2 }, // 2: Listening
        ];

        let activityIndex = 0;

        setInterval(() => {
            const activity = activities[activityIndex];

            client.user.setPresence({
                activities: [
                    {
                        name: activity.name,
                        type: activity.type,
                    }
                ],
                status: 'online', // 'online', 'idle', 'dnd', 'invisible'
            });

            activityIndex = (activityIndex + 1) % activities.length;

        }, 10000); // Cambia la actividad cada 10 segundos
    },
};
