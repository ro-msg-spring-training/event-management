import { EventImage } from "../model/EventImage"
import { UPLOAD_EVENT_IMAGES_S3, FETCH_EVENT_IMAGES_S3, fetchEventImagesS3Success, fetchEventImagesS3Error, fetchEventImagesS3Request } from "../actions/ImageActions"
import { takeLatest, call, put, takeEvery } from "redux-saga/effects"
import { uploadEventImagesS3, fetchEventImages, uploadEventImagesOnServer } from "../services/ImagesService"


interface UploadImageEventSagaProps {
    type: string,
    payload: {
        images: EventImage[],
        id: number
    }
}

interface FetchImageEventSagaProps {
    type: string,
    payload: number
}

function* uploadEventImagesAsync(action: UploadImageEventSagaProps) {
    // this part must be integrated with the rest of the details
    try {
        const newImages = yield call(uploadEventImagesS3, action.payload.images)
        yield call(uploadEventImagesOnServer, newImages, action.payload.id)
        // yield and call are not needed on the previous line, 
        // but in the future we may have to wait for the result
    }
    catch (err) {
        // to do
    }
}

export function* watchUploadEventImagesAsync() {
    yield takeEvery(UPLOAD_EVENT_IMAGES_S3, uploadEventImagesAsync)
}

function* fetchEventImagesAsync(action: FetchImageEventSagaProps) {
    yield put(fetchEventImagesS3Request())
    try {
        const result = yield fetchEventImages(action.payload)
        yield put(fetchEventImagesS3Success(result))
    }
    catch (err) {
        yield put(fetchEventImagesS3Error())
    }
}

export function* watchFetchEventImagesAsync() {
    yield takeLatest(FETCH_EVENT_IMAGES_S3, fetchEventImagesAsync)
}