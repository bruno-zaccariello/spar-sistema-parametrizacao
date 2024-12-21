export class IdUtils {
    static *idGenerator(): Generator<number> {
        let id = 0;
        while (true) {
            yield id++;
        }
    }
}