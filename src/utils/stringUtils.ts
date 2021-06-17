export function slugify(title: string): string {
    
    const slugger = [];

    for(let i=0; i< title.length; i++) {
        if(i >= 30) break;
        const letter = title[i].toLowerCase();
        if(letter >= 'a' && letter <= 'z') {
            slugger.push(letter);
        }else {
            slugger.push('-');
        }
    }
    return slugger.join('');
}