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
            console.log(menu[i].querySelector('h3').innerText);
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



//-------------------------------------------------------------------------
// Function: build_order_string
// Descripton: Builds a string that contains order information
//
// Inputs: none
//
// Outputs: order_string
//-------------------------------------------------------------------------
function build_order_string(){
    // Get menus
    let menu_A = document.getElementById('A').querySelectorAll('.order_option');
    let menu_B = document.getElementById('B').querySelectorAll('.order_option');
    let menu_C = document.getElementById('C').querySelectorAll('.order_option');

    const N_options_A = options_selected['A'].length;
    const N_options_B = options_selected['B'].length;
    const N_options_C = options_selected['C'].length;
    
    let price_A = 0;
    let price_B = 0;
    let price_C = 0;
    let price_A_string = '';
    let price_B_string = '';
    let price_C_string = '';
    let option_A = '';
    let option_B = '';
    let option_C = '';

    // Get selected options' names
    for (let i = 0; i < N_options_A; i++) {
        if (options_selected['A'][i] == 1){
            option_A = menu_A[i].querySelector('h2').innerText;
            price_A_string = menu_A[i].querySelector('h3').innerText;
            price_A = Number(price_A_string.slice(3).replace(",", "."));
            console.log('price_A = ' + price_A);
            break;
        }
    }

    for (let i = 0; i < N_options_B; i++) {
        if (options_selected['B'][i] == 1){
            option_B = menu_B[i].querySelector('h2').innerText;
            price_B_string = menu_B[i].querySelector('h3').innerText;
            price_B = Number(price_B_string.slice(3).replace(",", "."));
            break;
        }
    }
    
    for (let i = 0; i < N_options_C; i++) {
        if (options_selected['C'][i] == 1){
            option_C = menu_C[i].querySelector('h2').innerText;
            price_C_string = menu_C[i].querySelector('h3').innerText;
            price_C = Number(price_C_string.slice(3).replace(",", "."));
            break;
        }
    }
    
    // Calculate Total Price
    const total_price = price_A + price_B + price_C;
    const total_price_string = 'R$ '+String(total_price.toFixed(2))

    // Build order_string
    const order_string = "Olá, gostaria de fazer o pedido:\n- Prato: "+ option_A +"\n- Bebida: "+ option_B +"\n- Sobremesa: " + option_C + "\nTotal: " + total_price_string;

    return order_string
}





//-------------------------------------------------------------------------
// Function: finalize_order
// Descripton: Concludes order and directs user to whatsapp link
//
// Inputs: none
//
// Outputs: none
//-------------------------------------------------------------------------
function finalize_order(){

    // Build order_string
    const order_string = build_order_string();
    // Build Order URL
    const order_url = "https://wa.me/5511979536255?text=" + encodeURIComponent(order_string);

    // Link to Whatsapp URL
    parent.location = order_url;
}
