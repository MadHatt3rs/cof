import {Hitpoints} from "../controllers/hitpoints.js";
import {CharacterGeneration} from "../system/chargen.js";

export default function registerHooks() {

    Hooks.on("getChatLogEntryContext", (html, options) => {
        let canApplyDamage = li => li.find("h2.damage").length;
        let canApplyHealing = li => li.find("h2.heal").length;
        options.push(
            {
                name: game.i18n.localize("COF.ui.applyDamage"),
                icon: '<i class="fas fa-user-minus"></i>',
                condition: canApplyDamage,
                callback: li => {
                    const dmg = parseInt(li.find(".dice-total").text());
                    Hitpoints.applyToTargets(-dmg);
                }
            },
            {
                name: game.i18n.localize("COF.ui.applyDamage"),
                icon: '<i class="fas fa-user-minus"></i>',
                condition: canApplyHealing,
                callback: li => {
                    const dmg = parseInt(li.find(".dice-total").text());
                    Hitpoints.applyToTargets(-dmg);
                }
            },
            {
                name: game.i18n.localize("COF.ui.applyHalfDamage"),
                icon: '<i class="fas fa-user-shield"></i>',
                condition: canApplyDamage,
                callback: li => {
                    const dmg = Math.ceil(parseInt(li.find(".dice-total").text()) / 2);
                    Hitpoints.applyToTargets(-dmg);
                }
            },
            {
                name: game.i18n.localize("COF.ui.applyDoubleDamage"),
                icon: '<i class="fas fa-user-injured"></i>',
                condition: canApplyDamage,
                callback: li => {
                    const dmg = parseInt(li.find(".dice-total").text())*2;
                    Hitpoints.applyToTargets(-dmg);
                }
            },
            {
                name: game.i18n.localize("COF.ui.applyHealing"),
                icon: '<i class="fas fa-user-plus"></i>',
                condition: canApplyDamage,
                callback: li => {
                    const dmg = parseInt(li.find(".dice-total").text());
                    Hitpoints.applyToTargets(dmg);
                }
            },
            {
                name: game.i18n.localize("COF.ui.applyHealing"),
                icon: '<i class="fas fa-user-plus"></i>',
                condition: canApplyHealing,
                callback: li => {
                    const dmg = parseInt(li.find(".dice-total").text());
                    Hitpoints.applyToTargets(dmg);
                }
            }
        );
    });

    /**
     * Create a macro when dropping an entity on the hotbar
     * Item      - open roll dialog for item
     * Actor     - open actor sheet
     * Journal   - open journal sheet
     */

    Hooks.on("hotbarDrop", async (bar, data, slot) => {
        // Create item macro if rollable item - weapon, spell, prayer, trait, or skill
        if (data.type == "Item") {
            let item = data.data;
            let command = `game.cof.macros.rollItemMacro("${item._id}", "${item.name}", "${item.type}, 0, 0");`;
            let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
            if (!macro) {
                macro = await Macro.create({
                    name: item.name,
                    type : "script",
                    img: item.img,
                    command : command
                }, {displaySheet: false})
            }
            game.user.assignHotbarMacro(macro, slot);
        }
        // Create a macro to open the actor sheet of the actor dropped on the hotbar
        else if (data.type == "Actor") {
            let actor = game.actors.get(data.id);
            let command = `game.actors.get("${data.id}").sheet.render(true)`
            let macro = game.macros.entities.find(m => (m.name === actor.name) && (m.command === command));
            if (!macro) {
                macro = await Macro.create({
                    name: actor.data.name,
                    type: "script",
                    img: actor.data.img,
                    command: command
                }, {displaySheet: false})
                game.user.assignHotbarMacro(macro, slot);
            }
        }
        // Create a macro to open the journal sheet of the journal dropped on the hotbar
        else if (data.type == "JournalEntry") {
            let journal = game.journal.get(data.id);
            let command = `game.journal.get("${data.id}").sheet.render(true)`
            let macro = game.macros.entities.find(m => (m.name === journal.name) && (m.command === command));
            if (!macro) {
                macro = await Macro.create({
                    name: journal.data.name,
                    type: "script",
                    img: (journal.data.img) ? journal.data.img : "icons/svg/book.svg",
                    command: command
                }, {displaySheet: false})
                game.user.assignHotbarMacro(macro, slot);
            }
        }
        return false;
    });


    /**
     * Primary use of this hook is to intercept chat commands.
     * /char  - Begin character generation
     * /table - Roll on a table
     * /cond  - Lookup a condition
     * /name  - Generate a name
     * /avail - Start an item availability test
     * /pay - Player: Remove money from character. GM: Start a payment request
     * /credit - Player: Not allowed. GM: Start a credit request to send money to players
     * /help - display a help message on all the commands above
     */

    Hooks.on("chatMessage", (html, content, msg) => {
        let regExp;
        regExp = /(\S+)/g;
        let commands = content.match(regExp);
        let command = (commands.length>0 && commands[0].split("/").length > 0) ? commands[0].split("/")[1].trim() : null;
        let arg1 = (commands.length > 1) ? commands[1].trim() : null;
        const actor = game.cof.macros.getSpeakersActor();

        const validCommands = ["for", "str", "dex", "con", "int", "sag", "wis", "cha", "atc", "melee", "atd", "ranged", "atm", "magic"];

        if(command && validCommands.includes(command)) {
            game.cof.macros.rollStatMacro(actor, command, 0,null);
            return false;
        }
        else if(command && command === "skill") {
            if(arg1 && validCommands.includes(arg1)) {
                game.cof.macros.rollStatMacro(actor, arg1, 0, null);
            } else {
                ui.notifications.error("Vous devez préciser la caractéristique à tester, par exemple \"/skill str\".");
            }
            return false;
        }
        else if(command && command === "stats") {
            CharacterGeneration.statsCommand();
            return false;
        }
    });

    // Hooks.on("preCreateChatMessage", (data, options, user) => {
    //     console.debug("preCreateChatMessage");
    //     // console.log(data,options,user);
    //     return true;
    // });
    // Hooks.on("createChatMessage", (message, options, user) => {
    //     console.debug("createChatMessage");
    //     // console.log(message,options,user);
    //     return true;
    // });
    // Hooks.on("updateChatMessage", (message, update, options, user) => {
    //     console.debug("updateChatMessage");
    //     // console.log(message,update,options,user);
    //     return true;
    // });
    Hooks.on("renderChatMessage", (message, html, data) => {
        html.find(".apply-dmg").click(ev => Hitpoints.onClickChatMessageApplyButton(ev, html, data));
    });

    // Hooks.on("renderItemSheet", (app, html, data) => {
    //     console.debug("renderItemSheet");
    //     return true;
    // });
    // Hooks.on("renderChatLog", (app, html, data) => {
    //     console.debug("renderChatLog");
    //     return true;
    // });
    // Hooks.on('dropCanvasData', function (canvas, dropData) {
    //     console.debug("dropCanvasData");
    //     return true;
    // });
}
