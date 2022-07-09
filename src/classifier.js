function classifier(input) {
    const inputArr = input.slice();
    const output = {};

    if (typeof input !== 'object') {
        throw new Error('Invalid Input');
    }

    if (!inputArr.length) {
        output.noOfGroups = 0;
        return output;
    }

    const ageArr = inputArr.map(student => {
        student.age = 2019 - new Date(student.dob).getFullYear();
        return student
    }).sort((a, b) => {
        return a.age - b.age;
    })

    const membersArray = [];
    let members = [];

    members.push(ageArr[0]);

    for (let i = 1; i < ageArr.length; i++) {
        if (ageArr[i].age - members[0].age <= 5 && members.length < 3) {
            members.push(ageArr[i]);
        } else {
            membersArray.push(members);
            members = [];
            members.push(ageArr[i]);
        }
    }

    if (members.length > 0) {
        membersArray.push(members);
    }
    
    output.noOfGroups = membersArray.length;
    
    for (let i = 0; i < membersArray.length; i++) {
        output[`group${i + 1}`] = {
            members: membersArray[i],
            oldest: membersArray[i][membersArray[i].length - 1].age,
            sum: membersArray[i].reduce((acc, current) => {
                return acc += current.age;
            }, 0),
            regNos: membersArray[i].map(student => {
                return Number(student.regNo);
            }).sort((a, b) => {
                return a - b;
            })
        }
    }
    return output
}

export default classifier;
