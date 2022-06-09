let options_selected = {'A': [0, 0, 0, 0],
                             'B': [0, 0, 0, 0],
                             'C': [0, 0, 0, 0]};



function highlight(order_menu_index, order_menu_option) {
    update_options_selected(order_menu_index, order_menu_option)

    let x = document.getElementById(order_menu_index).querySelectorAll(".order_option");

    for (let i = 0; i < options_selected[order_menu_index].length; i++) {
        if (options_selected[order_menu_index][i] == 1){
            x[i].style.boxShadow = "inset 0px 0px 0px 5px #32B72F";
        }
        else{
            x[i].style.boxShadow = "initial";
        }
        
    }
    
}



function update_options_selected(order_menu_index, order_menu_option){

    options_selected[order_menu_index] = [0, 0, 0, 0];
    options_selected[order_menu_index][order_menu_option] = 1;
    
}
