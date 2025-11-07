import { writable } from "svelte/store";
export const currentFilter = writable("all");
export const filteredContent = writable([]);

export const contentCategories = {
  'giant': { type: 'brand', keywords: ['giant'] },
  'trek': { type: 'brand', keywords: ['trek'] },
  'specialized': { type: 'brand', keywords: ['specialized'] },
  'cannondale': { type: 'brand', keywords: ['cannondale'] },
  'scott': { type: 'brand', keywords: ['scott'] },
  'bianchi': { type: 'brand', keywords: ['bianchi'] },
  'cervelo': { type: 'brand', keywords: ['cervelo'] },
  'santa cruz': { type: 'brand', keywords: ['santa cruz'] },
  'yeti': { type: 'brand', keywords: ['yeti'] },
  'orbea': { type: 'brand', keywords: ['orbea'] },
  'vsf': { type: 'brand', keywords: ['vsf'] },
  'tout terrain': { type: 'brand', keywords: ['tout terrain'] },
  'brompton': { type: 'brand', keywords: ['brompton'] },
  
  // Bicycle Types
  'mountain': { type: 'type', keywords: ['mountain', 'mtb', 'trail'] },
  'road': { type: 'type', keywords: ['road', 'racing', 'tour de france'] },
  'hybrid': { type: 'type', keywords: ['hybrid', 'comfort', 'city'] },
  'electric': { type: 'type', keywords: ['electric', 'e-bike', 'ebike'] },
  'folding': { type: 'type', keywords: ['folding', 'brompton'] },
  
  // Drive Systems
  'chain': { type: 'drive', keywords: ['chain'] },
  'belt': { type: 'drive', keywords: ['belt'] },
  'gear': { type: 'drive', keywords: ['gear', 'alfine', 'select'] },
  'single speed': { type: 'drive', keywords: ['single speed', 'fixie'] }
}

export function filterContent(bikes, filterKey){
  if(filterKey === "all"){
    return bikes;
  }
  const category = contentCategories[filterKey.toLowerCase()];
  if (!category) return bikes;

  return bikes.filter(bike =>{
    const searchText = (bike.name + " " + bike.description).toLowerCase();
    return category.keywords.some(keyword => searchText.includes(keyword))
  })
}
