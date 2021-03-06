// Storage Controllor


// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200}'
            // {id: 1, name: 'Cookie', calories: 400},
            // {id: 2, name: 'Eggs', calories: 200}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        getItem: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;

            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            newItem = new item(ID, name, calories);

            data.items.push(newItem);

            return newItem;
        },
        getTotalCalories: function(){
            let total = 0;

            // Loop through items and add cals
            data.items.forEach(function(item){
                total += item.calories;
            });

            data.totalCalories = total;

            return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }
}) ();

// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    // Public methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a herf="#" class="secondary-content">
                     <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelector.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
        
            document.querySelector(UISelectors.itemList).style.display = 'block';
        
            const li = document.createElement('li');
            
            li.className = 'collection-item';
    
            li.id = `item-${item.id}`;
            
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a herf="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    const itemAddSubmit = function(e){
        const input = UICtrl.getItemInput();
        if(input.name !== '' && input.calories !== '')
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            UICtrl.addListItem(newItem);
            const totalCalories = ItemCtrl.getTotalCalories();
            UIctrl.showTotalCalories(totalCalories);
            UICtrl.clearInput();
        }
        e.preventDefault();
    }
    
    // Public methods
    return {
        init: function(){
            const items = ItemCtrl.getItems();
            if(items.length === 0){
                UICrtl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }
        
            const totalCalories = ItemCtrl.getTotalCalories(); 
            UICtrl.showTotalCalories(totalCalories);
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);
App.init();