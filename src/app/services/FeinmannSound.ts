import { Howl } from 'howler';
import { FaceService } from './face.service';

export default class FeinmannSound{
    _howl : Howl;
    
    constructor(soundSource :string, private faceService: FaceService){
        this._howl = new Howl({
            src:[soundSource],
            preload: true,
            onplay: () => faceService.startTalking(),
            onend: () => faceService.stopTalking()
        });
    }

    public get howl() : Howl{
        return this._howl;
    }
}