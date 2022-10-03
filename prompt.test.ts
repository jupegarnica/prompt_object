import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { stub } from "https://deno.land/std/testing/mock.ts";
import { promptObj, promptAny, promptArray, promptBoolean, promptNumber, promptText } from "./mod.ts";

Deno.test('[promptAny] should return the default value if null',
    () => {

        const prompt = stub(window, 'prompt', () => null);
        const result = promptAny('default value');
        assertEquals(result, 'default value');
        prompt.restore();
    })


Deno.test('[promptAny] should work with basic primitives', () => {
    const prompt = stub(globalThis, "prompt", (message) => {
        switch (message) {
            case "name":
                return "Garn";
            case "number":
                return "33";
            case "bool":
                return "false";
            default:
                return "";
        }
    });
    const result = promptAny("test", ["name"]);
    assertEquals(result, "Garn");
    prompt.restore();
});

Deno.test('[promptAny] should work with nested properties', () => {
    const prompt = stub(globalThis, "prompt", (message) => {
        switch (message) {
            case "a.b":
                return " 1 ";
            case "a.c.d":
                return " 2 ";
            default:
                return "";
        }
    });
    const result = promptAny({ a: { b: 0, c: { d: 1 } } });
    assertEquals(result, { a: { b: 1, c: { d: 2 } } });
    prompt.restore();
});



Deno.test(
    "[promptObj] should work with basic primitives", // { only: true },
    () => {
        const prompt = stub(globalThis, "prompt", (message) => {
            switch (message) {
                case "name":
                    return "Garn";
                case "number":
                    return "33";
                case "bool":
                    return "false";
                default:
                    return "";
            }
        });
        const result = promptObj({
            name: "test",
            number: 1,
            bool: true,
        });

        assertEquals(result, {
            name: "Garn",
            number: 33,
            bool: false,
        });

        prompt.restore();
    },
);

Deno.test(
    "[promptObj] should work with nested properties", // { only: true },
    () => {
        const prompt = stub(globalThis, "prompt", (message) => {
            switch (message) {
                case "a.b":
                    return " 1 ";
                case "a.c.d":
                    return " 2 ";
                default:
                    return "";
            }
        });
        const result = promptObj({
            a: {
                b: 0,
                c: { d: 1 },
            },
        });

        assertEquals(result, {
            a: {
                b: 1,
                c: { d: 2 },
            },
        });

        prompt.restore();
    },
);

Deno.test(
    "[promptObj] should work with arrays", // { only: true },
    () => {
        const prompt = stub(globalThis, "prompt", (message) => {
            switch (message) {
                case "a.0":
                    return " 10 ";
                case "a.1":
                    return " 20 ";
                case "a.2":
                    return " 30 ";
                case "b":
                    return "true";
                default:
                    return "";
            }
        });
        let i = 0;
        const confirm = stub(globalThis, "confirm", () => {
            if (i < 2) {
                i++;
                return true;
            } else {
                return false;
            }
        });

        const result = promptObj({
            a: [1],
            b: false,
        });

        assertEquals(result, {
            a: [10, 20, 30],
            b: true,
        });
        prompt.restore();
        confirm.restore();
    },
);


Deno.test('[promptArray] should ask for until do not confirm', () => {
    const prompt = stub(globalThis, "prompt", () => '10');
    let i = 0;
    const confirm = stub(globalThis, "confirm", () => i++ < 2);


    const result = promptArray([1]);
    assertEquals(result, [10, 10, 10]);
    prompt.restore();
    confirm.restore();
})

Deno.test('[promptArray] should ask for objects if the first item is an object', () => {
    const prompt = stub(globalThis, "prompt", () => '10');
    let i = 0;
    const confirm = stub(globalThis, "confirm", () => i++ < 0);

    const result = promptArray([{ a: 1, b: { c: 2 } }]);
    assertEquals(result, [{ a: 10, b: { c: 10 } }]);
    prompt.restore();
    confirm.restore();
})

Deno.test('[promptArray] should pass the initial value of the corresponding index',
    { only: true },
    () => {
        const prompt = stub(globalThis, "prompt", (message, initial) => {
            switch (message) {
                case "0":
                    assertEquals(initial, '1');
                    return "10";
                case "1":
                    assertEquals(initial, '2');
                    return "20";
                default:
                    assertEquals(initial, '1');
                    return "30";
            }
        });
        let i = 0;
        const confirm = stub(globalThis, "confirm", () => i++ < 2);

        const result = promptArray([1, 2]);
        assertEquals(result, [10, 20, 30]);
        prompt.restore();
        confirm.restore();
    })

Deno.test('[promptBoolean] should return a boolean', () => {
    const prompt = stub(globalThis, "prompt", () => 'true');
    const result = promptBoolean(false);
    assertEquals(result, true);
    prompt.restore();
})

Deno.test('[promptNumber] should return a number', () => {
    const prompt = stub(globalThis, "prompt", () => '10');
    const result = promptNumber(0);
    assertEquals(result, 10);
    prompt.restore();
})

Deno.test('[promptText] should return a string', () => {
    const prompt = stub(globalThis, "prompt", () => 'test');
    const result = promptText('test');
    assertEquals(result, 'test');
    prompt.restore();
})
