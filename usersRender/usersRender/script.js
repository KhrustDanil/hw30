const users = [
    {
        name: "Jack Smith",
        age: 23,
        img: "JackSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 20
            },
            {
                "title": "Java Enterprise",
                "mark": 100
            }
        ]
    },
    {
        name: "Amal Smith",
        age: 20,
        img: "AmalSmith",
        role: "student"
    },
    {
        name: "Noah Smith",
        age: 43,
        img: "NoahSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 50
            }
        ]
    },
    {
        name: "Charlie Smith",
        age: 18,
        img: "CharlieSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 75
            },
            {
                "title": "Java Enterprise",
                "mark": 23
            }
        ]
    },
    {
        name: "Emily Smith",
        age: 30,
        img: "EmilySmith",
        role: "admin",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 10,
                "lector": "Leo Smith"
            },
            {
                "title": "Java Enterprise",
                "score": 50,
                "lector": "David Smith"
            },
            {
                "title": "QA",
                "score": 75,
                "lector": "Emilie Smith"
            }
        ]
    },
    {
        name: "Leo Smith",
        age: 253,
        img: "LeoSmith",
        role: "lector",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 78,
                "studentsScore": 79
            },
            {
                "title": "Java Enterprise",
                "score": 85,
                "studentsScore": 85
            }
        ]
    }
];

const gradation = [
    { min: 86, max: 100, className: "excellent" },
    { min: 56, max: 85, className: "very-good" },
    { min: 21, max: 55, className: "good" },
    { min: 0, max: 20, className: "satisfactory" }
];

class User {
    constructor({ name, age, img, role, courses = [] }) {
        this.name = name;
        this.age = age;
        this.img = img;
        this.role = role;
        this.courses = courses;
    }

    getGradeClass(mark) {
        for (let i = 0; i < gradation.length; i++) {
            if (mark >= gradation[i].min && mark <= gradation[i].max) {
                return gradation[i].className;
            }
        }
    }

    renderCourses() {
        if (!this.courses.length) return '';

        return this.courses.map(course => {
            const gradeClass = this.getGradeClass(course.mark ?? course.score);
            return `
                <p class="user__courses--course ${this.role}">
                    ${course.title} <span class="${gradeClass}">${gradeClass}</span>
                </p>
            `;
        }).join('');
    }

    render() {
        return `
            <div class="user">
                <div class="user__info">
                    <div class="user__info--data">
                        <img src="images/users/${this.img}.png" alt="${this.name}" height="50">
                        <div class="user__naming">
                            <p>Name: <b>${this.name}</b></p>
                            <p>Age: <b>${this.age}</b></p>
                        </div>
                    </div>
                    <div class="user__info--role ${this.role}">
                        <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
                        <p>${this.role}</p>
                    </div>
                </div>
                <div class="user__courses">
                    ${this.renderCourses()}
                </div>
            </div>
        `;
    }
}

class Student extends User {}

class Admin extends User {
    renderCourses() {
        if (!this.courses.length) return '';

        return this.courses.map(course => {
            const gradeClass = this.getGradeClass(course.score);
            return `
                <div class="user__courses--course ${this.role}">
                    <p>Title: <b>${course.title}</b></p>
                    <p>Admin's score: <span class="${gradeClass}">${gradeClass}</span></p>
                    <p>Lector: <b>${course.lector}</b></p>
                </div>
            `;
        }).join('');
    }
}

class Lector extends User {
    renderCourses() {
        if (!this.courses.length) return '';

        return this.courses.map(course => {
            const gradeClass = this.getGradeClass(course.score);
            const studentGradeClass = this.getGradeClass(course.studentsScore);
            return `
                <div class="user__courses--course ${this.role}">
                    <p>Title: <b>${course.title}</b></p>
                    <p>Lector's score: <span class="${gradeClass}">${gradeClass}</span></p>
                    <p>Average student's score: <span class="${studentGradeClass}">${studentGradeClass}</span></p>
                </div>
            `;
        }).join('');
    }
}

const roleToClassMap = {
    student: Student,
    admin: Admin,
    lector: Lector
};

const userInstances = users.map(user => {
    const UserClass = roleToClassMap[user.role] || User;
    return new UserClass(user);
});

document.querySelector('.users').innerHTML = userInstances.map(user => user.render()).join('');


