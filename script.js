//-----------------------------  Global Variables  ------------------------
//-------------------------------------------------------------------------

// Global Variable that stores the state of each option on each menu.
let options_selected = {'A': [0, 0, 0, 0],
                        'B': [0, 0, 0, 0],
                        'C': [0, 0, 0, 0]};



//-----------------------------  Functions---------------------------------
//-------------------------------------------------------------------------
function highlight(order_menu_index, order_menu_option) {

    // Change global variable options_selected according to option clicked by user.
    update_options_selected(order_menu_index, order_menu_option)

    // Get div objects corresponding to all options of the clicked menu.
    let menu = document.getElementById(order_menu_index).querySelectorAll('.order_option');

    // Highlight selected option while un-highlighting the others in the same menu.
    const N_options = options_selected[order_menu_index].length;
    for (let i = 0; i < N_options; i++) {
        if (options_selected[order_menu_index][i] == 1){
            menu[i].classList.add('selected_border');
            let option_status_list = document.getElementById(order_menu_index).querySelectorAll('.order_option_status');
            option_status_list[i].classList.remove('hidden');
        }
        else{
            menu[i].classList.remove('selected_border');
            let option_status_list = document.getElementById(order_menu_index).querySelectorAll('.order_option_status');
            option_status_list[i].classList.add('hidden');
        }
    }

    // Update order button (check if one option per menu is selected)
    update_order_button()
}



function update_options_selected(order_menu_index, order_menu_option){

    // Get number of options in the "order_menu_index" menu.
    const N_options = options_selected[order_menu_index].length;

    // De-select all options in the "order_menu_index" menu.
    for (let i = 0; i < N_options; i++) {
        options_selected[order_menu_index][i] = 0;
    }
    // Select only "order_menu_option" in the associated menu.
    options_selected[order_menu_index][order_menu_option] = 1;
}





function update_order_button(){
    let order_button = document.querySelector('.order_button');
    const sum_A = sum_array(options_selected['A']);
    const sum_B = sum_array(options_selected['B']);
    const sum_C = sum_array(options_selected['C']);

    let update = false;
    if (sum_A == 1 && sum_B == 1 && sum_C == 1){
        order_button.classList.add('clickable_button');
        order_button.getElementsByTagName('h2')[0].innerHTML = "Fazer Pedido";
    }
}




function sum_array(array){
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}
