module.exports = {
    users: [
        { id: 1, name: 'first' },

        { id: 2, name: 'second' },

        { id: 3, name: 'third' },

        { id: 4, name: 'fourth' },
    ],

    projects: [
        {
            id: 1,

            title_name: 'first_project',
            description: 'found  more reasons to hate JS',
            commits: -1,

            Owner_id: 2,
            url: '/projects/name/first_project',
        },

        {
            id: 2,

            title_name: 'second_project',
            description: 'idk',
            commits: 'null',

            Owner_id: 1,
            url: '/projects/name/second_project',
        },
    ],

    contributes_on: [
        {
            project_id: 1,
            username: 'first',
        },
        {
            project_id: 2,
            username: 'first',
        },
        {
            project_id: 2,
            username: 'second',
        },
    ],
}
