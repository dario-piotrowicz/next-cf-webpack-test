export default function getRequestContext() {
    const req = null;
    const env = {
        MY_KV: {
            get(key) {
                if (key === 'myKey') return 'myValue';
            }
        }
    };
    const ctx = null;

    return [ req, env, ctx ];
}