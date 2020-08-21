import { UserEventList } from '../model/UserEventList'
import { FETCH_USER_EVENTS_SUCCESS, FETCH_USER_EVENTS_REQUEST, FETCH_USER_EVENTS_ERROR } from '../actions/UserEventListActions'


export interface UserEventsPageState {
    events: UserEventList[],
    isLoading: boolean,
    isError: boolean,
    page: number,
    limit: number,
    isMore: boolean
}

const initialState = {
    // events: [],
    events: [
        {
            id: 1,
            title: 'Adunarea nationala',
            location: 'Piata Unirii',
            startDate: new Date('2020-07-07'),
            endDate: new Date('2020-08-08'),
            startHour: '10:00',
            endHour: '22:00',
            rate: 70,
            images: ['https://static4.cdn.jurnaltv.md/superdesk/20180906170912/3d6bfa7f-1079-44da-afc0-e1cb8fdb8659.jpg']
        },
        {
            id: 2,
            title: 'CFR Cluj vs Universitatea CLuj',
            location: 'Cluj Arena',
            startDate: new Date('2020-07-10'),
            endDate: new Date('2020-07-10'),
            startHour: '18:00',
            endHour: '21:00',
            rate: 85,
            images: ['https://s.hs-data.com/bilder/teamfotos/640x360/4947.jpg']
        },
        {
            id: 3,
            title: 'Kitch Party',
            location: 'Janis',
            startDate: new Date('2020-09-10'),
            endDate: new Date('2020-09-10'),
            startHour: '18:00',
            endHour: '03:00',
            rate: 50,
            images: ['https://cdn.cluj.com/cluj/janis1.jpg']
        },
        {
            id: 4,
            title: 'Jazz in the park',
            location: 'Parcul Central',
            startDate: new Date('2020-09-10'),
            endDate: new Date('2020-09-12'),
            startHour: '12:00',
            endHour: '23:00',
            rate: 75,
            images: ['https://www.yourope.org/cms/wp-content/uploads/2020/01/Jazz-in-the-Park-3.jpg']
        },
        {
            id: 5,
            title: 'Olarit in Parcul Central',
            location: 'Parcul Central',
            startDate: new Date('2020-09-10'),
            endDate: new Date('2020-09-12'),
            startHour: '12:00',
            endHour: '23:00',
            rate: 75,
            images: []
        },

    ],
    isLoading: false,
    isError: false,
    page: 1,
    limit: 10,
    isMore: true
}

interface ReducerActionProps {
    type: string,
    payload: any
}

export const UserEventsReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case FETCH_USER_EVENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_USER_EVENTS_SUCCESS:
            return {
                ...state,
                events: state.events.concat(action.payload.events),
                isMore: action.payload.more,
                isLoading: false
            }
        case FETCH_USER_EVENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isMore: false
            }
        default:
            return state
    }
}
