module.exports = {
 
    "users":[{ "id" :1,
              "name": "first"  
            },

            { "id" :2,
               "name": "second"  
            },

            { "id" :3,
            "name": "third"  
            },

            { "id" :4,
            "name": "fourth"  
            }],

    "projects":[{ "id" : 1,
                 "title": {
                    "title_name" : "first_project",
                    "description": "found  more reasons to hate JS",
                    "commits": -1
                  },
                 "Owner_id": 2,
                 "url" : ""
               },

               { "id" :2,
               "title": {
                "title_name" : "second_project",
                "description": "idk",
                "commits": "null"
              },
                "Owner_id": 1,
                "url" : ""

              }],

    "contributes_on":[{ 
                        "Project_id": 1, 
                        "User_id": 1,
                        "User_id": 3,
                        "User_id": 2,
                    },
                    { 
                      "User_id": 2,
                      "User_id": 4,
                      "User_id": 3,
                      "Project_id": 2  
                    }]
};