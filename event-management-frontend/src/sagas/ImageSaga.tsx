import { EventImage } from "../model/EventImage"
import { UPLOAD_EVENT_IMAGES_S3, FETCH_EVENT_IMAGES_S3, fetchEventImagesS3Success, fetchEventImagesS3Error, fetchEventImagesS3Request } from "../actions/ImageActions"
import { takeLatest, call, put, takeEvery } from "redux-saga/effects"
import { uploadEventImages, fetchEventImages, uploadEventImagesOnServer } from "../services/ImagesService"

interface ImageEventSagaProps {
    type: string,
    payload: EventImage[]
}

function* uploadEventImagesAsync(action: ImageEventSagaProps) {
    try {
        const images = action.payload
        const s3URLs = yield call(uploadEventImages, images)
        yield call(uploadEventImagesOnServer, images, s3URLs)
    }
    catch (err) {
        // to do
    }
}

export function* watchUploadEventImagesAsync() {
    yield takeEvery(UPLOAD_EVENT_IMAGES_S3, uploadEventImagesAsync)
}

function* fetchEventImagesAsync() {
    yield put(fetchEventImagesS3Request())
    try {
        const result = yield fetchEventImages()
        yield put(fetchEventImagesS3Success(result))
    }
    catch (err) {
        yield put(fetchEventImagesS3Error())
    }
}

export function* watchFetchEventImagesAsync() {
    yield takeLatest(FETCH_EVENT_IMAGES_S3, fetchEventImagesAsync)
}