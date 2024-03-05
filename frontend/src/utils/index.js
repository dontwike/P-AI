import { surpriseMePrompts } from '../constants/index'
import FileSaver from 'file-saver'

export function getRandomPrompts(prompts) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompts = surpriseMePrompts[randomIndex]

    if(randomPrompts === prompts){
        return getRandomPrompts(prompts)
    }

    return randomPrompts
}

export async function downloadImage(){
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}