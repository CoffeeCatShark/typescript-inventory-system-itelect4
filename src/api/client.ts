import type { Item, Supplier } from "@/types/types";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:3001/api"
).replace(/\/+$/, "");

// ============================================================
// HELPER: CHECK RESPONSE
// ============================================================

async function checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || `API Error: ${response.status}`
        );
    }

    return response;
}

// ============================================================
// HELPER: CONVERT MONGODB _id TO FRONTEND id
// ============================================================

function normalizeDocument<T>(data: unknown): T {
    if (Array.isArray(data)) {
        return data.map((item) => normalizeDocument(item)) as T;
    }

    if (data && typeof data === "object" && "_id" in data) {
        const { _id, ...rest } = data as Record<string, unknown>;

        return {
            ...rest,
            id: String(_id)
        } as T;
    }

    return data as T;
}

// ============================================================
// GET ONE
// ============================================================

export function get(key: `suppliers/${string}`): Promise<Supplier | undefined>;
export function get(key: `items/${string}`): Promise<Item | undefined>;

export async function get(
    key: string
): Promise<Supplier | Item | undefined> {
    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`)
    );

    const data = await response.json();

    return normalizeDocument<Supplier | Item>(data);
}

// ============================================================
// GET ALL
// ============================================================

export function list(key: "items", supplierID?: string): Promise<Item[]>;
export function list(key: "suppliers"): Promise<Supplier[]>;

export async function list(
    key: string,
    supplierID?: string
): Promise<Supplier[] | Item[]> {

    const params = new URLSearchParams();

    if (key === "items" && supplierID) {
        params.set("supplierID", supplierID);
    }

    const queryString = params.toString();

    const response = await checkResponse(
        await fetch(
            `${API_URL}/${key}${queryString ? `?${queryString}` : ""}`
        )
    );

    const data = await response.json();

    return normalizeDocument<Supplier[] | Item[]>(data);
}

// ============================================================
// UPDATE
// ============================================================

export async function update<T, R = T>(
    key: string,
    data: T
): Promise<R> {
    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    );

    const result = await response.json();

    return normalizeDocument<R>(result);
}

// ============================================================
// CREATE
// ============================================================

export async function create<T, R = T>(
    key: string,
    data: T
): Promise<R> {
    const response = await checkResponse(
        await fetch(`${API_URL}/${key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    );

    const result = await response.json();

    return normalizeDocument<R>(result);
}

// ============================================================
// DELETE
// ============================================================

export async function remove(key: string): Promise<void> {
    await checkResponse(
        await fetch(`${API_URL}/${key}`, {
            method: "DELETE"
        })
    );
}