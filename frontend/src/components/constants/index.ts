export const DEPARTMENTS = [
    'Computer Science',
     "Software Engineering",
      "Information Technology",
       "Electrical Engineering",
        "Mechanical Engineering",
         "Civil Engineering",
          "Chemical Engineering",
           "Architecture",
            "Business Administration",
             "Economics", 
             "Psychology",
              "Biology",
               "Mathematics", 
               "Physics",
                "Chemistry"
            ];

export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept
}));