import {createContext} from "react";

type Note = {
    name: string,
    date: Date,
    priority: string,
    description: string
}
export class Group {
    color: string
    name: string
    icon: string
    notes: Note[] | undefined
    constructor(color: string, name: string, icon: string) {
        this.color = color
        this.name = name
        this.icon = icon
    }
}
export const HomeContext = createContext({
    userName: "",
    userPhoto: "",
    userGroups: [new Group("", "", "")]
});