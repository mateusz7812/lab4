function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function prepareTable(number){
    number = parseInt(number);

    let message = "";

    if(isNaN(number) || 5 > number || number > 20){
        number = 5;
        message = "(Podano złą wartość, przyjęto domyślną)";
    }

    let randoms = get_randoms_ints(number);
    randoms.sort(function(a, b) {
        return a - b;
    });

    let section = document.createElement("section");
    let table = document.createElement("table");
    table.className = "multiply-table";

    prepare_thead(number, table, message);

    prepare_tbody(number, randoms, table);

    section.appendChild(table);
    $(section).insertAfter('#form_section');
}

function get_randoms_ints(number) {
    let randoms = [];
    for (let i = 0; i < number; i++) {
        randoms[i] = getRandomArbitrary(1, 99);
    }
    return randoms;
}

function prepare_tbody(number, randoms, table) {
    let tbody = document.createElement('tbody');
    let tbody_tr;
    let tbody_td;
    let tbody_th;

    tbody_tr = document.createElement('tr');
    tbody_tr.appendChild(document.createElement('th'));
    for (let i = 0; i < number; i++) {
        tbody_th = document.createElement('th');
        tbody_th.appendChild(document.createTextNode(randoms[i]));
        tbody_tr.appendChild(tbody_th);
    }
    tbody.appendChild(tbody_tr);

    for (let i = 0; i < number; i++) {
        tbody_tr = document.createElement('tr');

        tbody_th = document.createElement('th');
        tbody_th.appendChild(document.createTextNode(randoms[i]));
        tbody_tr.appendChild(tbody_th);

        for (let j = 0; j < number; j++) {
            tbody_td = document.createElement('td');
            let result = randoms[i] * randoms[j];
            tbody_td.appendChild(document.createTextNode(result));
            let className = "odd";
            if(result % 2 == 0){
                className = "even";
            }
            tbody_td.setAttribute("class", className);
            tbody_tr.appendChild(tbody_td);
        }
        tbody.appendChild(tbody_tr);
    }

    table.appendChild(tbody);
    return { tbody_tr, tbody_th, tbody_td };
}

function prepare_thead(number, table, message) {
    let thead_th = document.createElement('th');
    thead_th.setAttribute("colspan", number + 1);
    thead_th.appendChild(document.createTextNode('Tabliczka mnożenia dla n=' + number));
    thead_th.appendChild(document.createElement('br'));
    thead_th.appendChild(document.createTextNode(message));
    let thead_tr = document.createElement('tr');
    thead_tr.appendChild(thead_th);
    let thead = document.createElement('thead');
    thead.appendChild(thead_tr);
    table.appendChild(thead);
}
