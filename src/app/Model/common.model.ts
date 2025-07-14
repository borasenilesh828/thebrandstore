export interface Product {
  id: string;
  image: string;
  title: string;
  brand: string;
  price: string;
  category: string;
  subcategory: string;
  description: string;
  rating: {
    star: string;
    count: string;
  };
  }
  
  export interface UserOrder {
    email: string;
    orders: OrderItem[];
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
    date: string;
  }
  
  export interface Cart {
    email: string;
    cart: CartItem[];
  }
  export interface CartItem {
    productId: string;
    quantity: string;
  }
  
    
  export interface Item {
    productId: string;
    brand: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
  }

  export interface Order {
    OrderID: string;
    Products_Total: string;
    GST: string;
    Discount: string;
    Shipping_Charges: string;
    Total: string;
    Payment_Method: string;
    date: string,
    items: Item[];
  }
  
