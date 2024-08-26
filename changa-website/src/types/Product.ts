export enum DiscType {
    'CD',
    'LP',
    'DVD',
    'CASSETTE',
  }
  
  export enum Category {
    Rock = 'Rock',
    Pop = 'Pop',
    Jazz = 'Jazz',
    Classical = 'Classical',
    HipHop = 'HipHop',
  }
  
  export interface Product {
    id: number;                 
    created: Date;            
    album: string;             
    artist: string;           
    price: string;              
    quantity: number;          
    discType: DiscType;      
    category: Category;        
    recordLabel: string;     
    releaseYear: number;       
    description: string;          
  }
  