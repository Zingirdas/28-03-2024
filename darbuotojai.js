const nameInp = document.getElementById("name");
const surnInp = document.getElementById("surrname");
const salInp = document.getElementById("salary");
const list = document.getElementById("tasks_list");
const addBtn = document.getElementById("add_empl");
const delBtn = document.getElementById("del_list");

let staff = [];

const saveStaff = () => {
    localStorage.setItem("staff", JSON.stringify(staff));
}

const loadStaff = () => {
    const lsStaff = localStorage.getItem("staff");
    if (lsStaff != null) {
        staff = JSON.parse(lsStaff);
        showStaff();
    }
}

const showStaff = () => {
    list.innerHTML = "";
    let totalSalary = 0;
    staff.forEach((t, i) => {
        const newStaff = document.createElement("li");
        newStaff.className = "list-group-item";
        newStaff.textContent = `${t.name} ${t.surrname} - ${t.salary} EUR`;
        list.appendChild(newStaff);

        totalSalary += parseFloat(t.salary);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.className = "btn btn-info float-end btn-sm";
        deleteBtn.onclick = () => {
            staff.splice(i, 1);
            saveStaff();
            showStaff();
        };
        newStaff.appendChild(deleteBtn);
    });


    salInp.addEventListener("change", function () {
        const input = parseFloat(salInp.value);
        if (isNaN(input)) {
            alert("Prasau įvesti skaičius");
            salInp.value = "";
        }
    });

    const totalEmployees = staff.length;
    const averageSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;

    const totalInfo = document.getElementById("total_info");
    const totalInfo1 = document.getElementById("total_info1");

    totalInfo.textContent = `Atlyginimų suma: ${totalSalary.toFixed(2)} EUR`;
    totalInfo1.textContent = `Atlyginimų vidurkis: ${averageSalary.toFixed(2)} EUR`;

}


const addDarb = () => {
    const name = nameInp.value;
    const surrname = surnInp.value;
    const salary = salInp.value;
    nameInp.value = "";
    surnInp.value = "";
    salInp.value = "";
    staff.push({
        name: name,
        surrname: surrname,
        salary: salary
    });
    showStaff();
    saveStaff();
}

const clearList = () => {
    staff = [];
    saveStaff();
    showStaff();
}

addBtn.onclick = addDarb;
delBtn.onclick = clearList;

loadStaff();