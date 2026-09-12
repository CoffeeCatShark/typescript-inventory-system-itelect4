import type {
    Item,
    Supplier,
    Manager,
    DeliveryBox
} from "@/types/types";


const API_URL = "http://localhost:3001";

// ============================================================
// HELPER
// ============================================================

async function checkResponse(
    response: Response
): Promise<Response> {

    if (!response.ok) {
        throw new Error(
            `API Error: ${response.status}`
        );
    }

    return response;
}

// ============================================================
// OVERLOADS
// ============================================================
export function get(key: `suppliers/${string}`): Promise<Supplier | undefined>;
export function get(key: `managers/${string}`): Promise<Manager | undefined>;
export function get(key: `items/${string}`): Promise<Item | undefined>;
// ============================================================


export async function get(
    key: string
): Promise< Supplier | Manager | Item | undefined> {

    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`)
    );

    const data = await response.json();

    return data;
}

// ============================================================
// OVERLOADS
// ============================================================
export function list(key: "suppliers"): Promise<Supplier[]>;
export function list(key: "managers"): Promise<Manager[]>;
export function list(key: "items"): Promise<Item[]>;
// ============================================================

export async function list(key:string
): Promise<Supplier[] | Manager[] | Item[] | undefined> {

    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`)
    );

    const data = await response.json();

    return data
}

export async function update<T>(
    key: string,
    data: T
): Promise<T> {


    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    );

    return await response.json();
}   //update<TYPE>("<DATA_LINK_ID>, <UPDATED>")


export async function create<T, R = T>(
    key: string,
    data: T
): Promise<R> {

    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    );

    return await response.json();
}   //Create<TYPE>("databaseName",<NEWDATA> )


export async function remove(key: string): Promise<void> {

    await checkResponse(
        await fetch(`${API_URL}/${key}`, {
            method: "DELETE",
        })
    );
}   //remove("<DATA_LINK_ID>")