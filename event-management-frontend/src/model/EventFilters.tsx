import { MathRelation } from "./MathRelation";

export interface EventFilters {
    title: string,
    subtitle: string,
    status: string,
    highlighted: boolean,
    location: string,
    startDate: Date | null, 
    endDate: Date | null, 
    startHour: string,
    endHour: string,
    rate: number | string,
    rateSign: MathRelation,
    maxPeople: number | string,
    maxPeopleSign: MathRelation
}