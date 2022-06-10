//-----------------------------  Global Variables  ------------------------
//-------------------------------------------------------------------------

// Global Variable that stores the state of each option on each menu.
let options_selected = {'A': [0, 0, 0, 0],
                        'B': [0, 0, 0, 0],
                        'C': [0, 0, 0, 0]};



//-----------------------------  Functions---------------------------------
//-------------------------------------------------------------------------


//-------------------------------------------------------------------------
// Function: highlight
// Description: Function called whenever user clicks on one of the options.
// Highlights the border of selected option (and de-selectes previous options
// in the same menu). Calls the update_order_button() function.
//
// Inputs:
// order_menu_index: Id of order_menu div ('A', 'B', 'C')
// order_menu_option Which order_option inside the menu (0, 1, 2, 3)
//
// Outputs: None;
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


//-------------------------------------------------------------------------
// Function: update_options_selected
// Descripton: Updates the global dictionary options_selected according
// to selected option
//
// Inputs:
// order_menu_index: Id of order_menu div ('A', 'B', 'C')
// order_menu_option Which order_option inside the menu (0, 1, 2, 3)
//
// Outputs: None;
//-------------------------------------------------------------------------
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




//-------------------------------------------------------------------------
// Function: update_order_button
// Descripton: Checks if one option has een selected in each menu and
// updates order_button
//
// Inputs: None
//
// Outputs: None;
//-------------------------------------------------------------------------
function update_order_button(){
    let order_button = document.querySelector('.order_button');
    let order_buton_clickable = document.querySelector('.order_button_clickable');
    const sum_A = sum_array(options_selected['A']);
    const sum_B = sum_array(options_selected['B']);
    const sum_C = sum_array(options_selected['C']);

    // Check if exactly one option per menu is selected
    let update = false;
    if (sum_A == 1 && sum_B == 1 && sum_C == 1){
        order_button.classList.add('hidden');
        order_buton_clickable.classList.remove('hidden')
        //order_button.getElementsByTagName('h2')[0].innerHTML = "Fechar pedido";
    }
}




//-------------------------------------------------------------------------
// Function: sum_array
// Descripton: Returns the sum of elements in an array.
//
// Inputs: array
//
// Outputs: Sum of elements in array
//-------------------------------------------------------------------------
function sum_array(array){
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}




function finalize_order(){
    const order_string = "Olá, gostaria de fazer o pedido:\n- Prato: Frango Yin Yang\n- Bebida: Coquinha Gelada\n- Sobremesa: Pudim\nTotal: R$ 27.70;"
    const order_url = "https://wa.me/5511979536255?text=" + encodeURIComponent(order_string);
    parent.location = order_url;
}
