export enum DiscType {
    'CD',
    'LP',
    'DVD',
    'CASSETTE',
  }
  
  export enum Category {
    'Rock',
    'Pop',
    'Jazz',
    'Classical',
    'HipHop',
  }
  
  export interface Product {
    id: number | undefined;                 
    created: Date | undefined;            
    album: string;             
    artist: string;       
    price: number;              
    quantity: number;          
    discType: DiscType;      
    category: Category;        
    recordLabel: string;     
    releaseYear: number;       
    description: string;    
    cover: string;          
  }
  