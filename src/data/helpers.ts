
//will probably delete
export function add<T>(items: T[], value:T ): void {
    items.push(value)
}

export function remove<T, K extends keyof T>(
    array: T[],
    key: K,
    value: T[K]
): void {
    const index = array.findIndex(item => item[key] === value);

    if (index !== -1) {
        array.splice(index, 1);
    }
}


export function update<T, K extends keyof T>(
    array: T[],
    key: K,
    updatedItem: T
): boolean {
    const index = array.findIndex(item => item[key] === updatedItem[key]);

    if (index === -1) {
        return false;
    }

    array[index] = updatedItem;
    return true;
}


//==========================================================
//The only Important One (Used By Cards)
export function getById<
    T,
    K extends keyof T
>(
    list: T[],
    key: K,
    id: T[K]
): T | undefined {
    return list.find(item => item[key] === id);
}

//**================================================== GUIDE
// Type = Type.(Manager, Supplier, etc.) 
// Key = Identifier(supplierID, managerID, etc.)
// Value = Key Value(ID = 5. value is 5.)
//
// add<T>(Type, value = key);
// getById<T>(Type, key, value = key);
// update<T>(Type, key, value = type);
// remove<T>(Type, key, value = key);

//  */
