'use client'
import { signupTypeInterface } from "@/components/Signup/Signup";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


export interface customerInterface {
    customer_review: string,
    customer_ratting: number
}
export interface productInterface {
    _id: number,
    title: string,
    brand: string,
    price: number,
    ratting: number,
    image: string[],
    desc: string,
    category: string,
    customer: customerInterface[]
    quantity?: number
}


export type cartItemType = {
    [key: number]: number
}
type likeType = {
    [key: number]: boolean
}
export type productContextAliasis = {
    cardData: productInterface[];
    setCardData: (data: productInterface[] | ((prev: productInterface[]) => productInterface[])) => void;
    like: likeType;
    setLike: (data: likeType | ((prev: likeType) => likeType)) => void;
    handleLike: (id: number) => void;
    handleUnLike: (id: number) => void;
    addToCart: (itemId: number) => void;
    cartItems: cartItemType;
    setCartItems: (data: cartItemType | ((prev: cartItemType) => cartItemType)) => void;
    cartData: productInterface[];
    setCartData: (data: productInterface[] | ((prev: productInterface[]) => productInterface[])) => void;
    getLocalStorageData: <T>(key: string, fallback: T) => T;
    verifyLogin: () => void;
}
export const ProductContext = createContext<productContextAliasis | null>(null);
export const ProductContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [cardData, setCardData] = useState<productInterface[]>([]);
    const [like, setLike] = useState<likeType>({});
    const [cartItems, setCartItems] = useState<cartItemType>({});
    const [cartData, setCartData] = useState<productInterface[]>([]);

    const getLocalStorageData = (key: string, fallback: unknown) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (error) {
            console.error(`Error parsing ${key} from localStorage:`, error);
            return fallback;
        }
    };

    const verifyLogin = () => {
        const token: string | unknown = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }


    const handleLike = (id: number) => {
        const user = getLocalStorageData("users", {});
        const newData: signupTypeInterface = { ...user, likeId: [...(user.likeId || []), id] }
        localStorage.setItem('users', JSON.stringify(newData));
    }

    const handleUnLike = (id: number) => {
        const user = getLocalStorageData("users", {});
        const like: number[] = user.likeId || [];
        const removeId: number[] = like.filter(item => item !== id);
        const newData: signupTypeInterface = { ...user, likeId: removeId }
        localStorage.setItem('users', JSON.stringify(newData));
    }

    useEffect(() => {
        const user = getLocalStorageData("users", {});
        const likeId: number[] = user.likeId || [];
        const allData = getLocalStorageData("alldata", {});
        const product: productInterface[] = allData.product || [];

        const hasMatch: productInterface[] = product.filter(item => likeId.includes(item._id)) || []

        hasMatch.map((item: productInterface) => {
            setLike(prev => ({
                ...prev,
                [item._id]: true
            }))
        })
    }, [])

    useEffect(() => {
        const users = getLocalStorageData("users", {});
        const cart: productInterface[] = users.cart || [];

        cart.map((x: productInterface) => {
            setCartItems((prev) => ({ ...prev, [x._id]: x.quantity || 1 }))
        })
    }, [])

    const addToCart = (itemId: number) => {
        const alldata = getLocalStorageData("alldata", {});
        const users = getLocalStorageData("users", { cart: [] });

        const product: productInterface[] = alldata.product || [];
        const findCartData = product.find(item => item._id === itemId);
        const finalCartdata = { ...users, cart: [...(users.cart || []), { ...(findCartData || []), quantity: 1 }] };
        localStorage.setItem('users', JSON.stringify(finalCartdata));
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        setCartData(users.cart || []);
    }

    useEffect(() => {
        const users = getLocalStorageData("users", { cart: [] });
        setCartData(users.cart || []);
    }, [cartItems])


    const contextValues: productContextAliasis = {
        verifyLogin,
        cardData, setCardData,
        like, setLike, handleLike, handleUnLike,
        cartItems, setCartItems, addToCart, cartData, setCartData, getLocalStorageData
    }

    return (
        <ProductContext.Provider value={contextValues}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const productContextValues = useContext(ProductContext);

    if (!productContextValues) {
        throw new Error('context not working...')
    }
    return productContextValues;
}