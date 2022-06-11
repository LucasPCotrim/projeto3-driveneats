//-----------------------------  Global Variables  ------------------------
//-------------------------------------------------------------------------

// Global Variable that stores the state of each option on each menu.
let options_selected = {'A': [0, 0, 0, 0],
                        'B': [0, 0, 0, 0],
                        'C': [0, 0, 0, 0]};

let on_order_confirmation_screen = false;


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

    if (on_order_confirmation_screen){
        return;
    }

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
// Function: get_names_and_prices_of_selected_options
// Descripton: Returns the names and prices of options selected by the user
//
// Inputs: none
//
// Outputs: {options, prices}
//-------------------------------------------------------------------------
function get_names_and_prices_of_selected_options(){
    // Get menus
    let menu_A = document.getElementById('A').querySelectorAll('.order_option');
    let menu_B = document.getElementById('B').querySelectorAll('.order_option');
    let menu_C = document.getElementById('C').querySelectorAll('.order_option');

    // Get options selected
    const i_A = options_selected['A'].indexOf(1);
    const i_B = options_selected['B'].indexOf(1);
    const i_C = options_selected['C'].indexOf(1);
    let option_A = menu_A[i_A].querySelector('h2').innerText;
    let option_B = menu_B[i_B].querySelector('h2').innerText;
    let option_C = menu_C[i_C].querySelector('h2').innerText;

    // Get prices
    const price_A_string = menu_A[i_A].querySelector('h3').innerText;
    const price_B_string = menu_B[i_B].querySelector('h3').innerText;
    const price_C_string = menu_C[i_C].querySelector('h3').innerText;
    let price_A = Number(price_A_string.slice(3).replace(",", "."));
    let price_B = Number(price_B_string.slice(3).replace(",", "."));
    let price_C = Number(price_C_string.slice(3).replace(",", "."));

    // Construct return dictionaries
    options = {'A': option_A,
               'B': option_B,
               'C': option_C};
    prices = {'A': price_A,
              'B': price_B,
              'C': price_C};

    return {options, prices};
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

    let {options, prices} = get_names_and_prices_of_selected_options();
    
    // Calculate Total Price
    const total_price = prices['A'] + prices['B'] + prices['C'];
    const total_price_string = 'R$ '+String(total_price.toFixed(2))

    // Build order_string
    const order_string = "Olá, gostaria de fazer o pedido:\n- Prato: "+ options['A'] +"\n- Bebida: "+ options['B'] +"\n- Sobremesa: " + options['C'] + "\nTotal: " + total_price_string;

    return order_string
}





//-------------------------------------------------------------------------
// Function: build_order_string
// Descripton: Builds a string that contains order information
//
// Inputs: none
//
// Outputs: order_string
//-------------------------------------------------------------------------
function show_order_confirmation(){
    // Set global variable to avoid letting user reselect options in this menu.
    on_order_confirmation_screen = true;
    
    // Get names and prices of selected options
    let {options, prices} = get_names_and_prices_of_selected_options();

    // Set names and prices of selected options
    let oc_menu = document.querySelector('.confirm_order_window');
    let oc_lines = oc_menu.querySelectorAll('.confirm_order_window_line');
    oc_lines[0].querySelectorAll('h2')[0].innerText = options['A'];
    oc_lines[0].querySelectorAll('h2')[1].innerText = 'R$ ' + String(prices['A'].toFixed(2)).replace('.', ',');
    oc_lines[1].querySelectorAll('h2')[0].innerText = options['B'];
    oc_lines[1].querySelectorAll('h2')[1].innerText = 'R$ ' + String(prices['B'].toFixed(2)).replace('.', ',');
    oc_lines[2].querySelectorAll('h2')[0].innerText = options['C'];
    oc_lines[2].querySelectorAll('h2')[1].innerText = 'R$ ' + String(prices['C'].toFixed(2)).replace('.', ',');

    const total_price = prices['A'] + prices['B'] + prices['C'];
    console.log('total price = ' + String(total_price));
    oc_lines[3].querySelectorAll('h2')[1].innerText = 'R$ ' + String(total_price.toFixed(2)).replace('.', ',');

    // Display order confirmation screen
    oc_menu.classList.remove('hidden');
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


//-------------------------------------------------------------------------
// Function: cancel_order
// Descripton: Cancels current order and goes back to main screen.
//
// Inputs: none
//
// Outputs: none
//-------------------------------------------------------------------------
function cancel_order(){
    on_order_confirmation_screen = false;
    let oc_menu = document.querySelector('.confirm_order_window');
    oc_menu.classList.add('hidden');
}
