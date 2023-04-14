export class Hitpoints {
    static applyToTargets(amount, dr) {
        // on prend les cibles s'il y en a, sinon on prend les tokens actifs.
        // notation [...] transforme un Set en Array
        let targets = ([...game.user.targets].length > 0) ? [...game.user.targets] : canvas.tokens.objects.children.filter(t => t._controlled);
        if (targets.length == 0) {
            ui.notifications.error(game.i18n.localize("COF.notification.HitPointsNoTarget"));
        } else {
            for(let target of targets){
                let hp = duplicate(target.actor.system.attributes.hp);
                // Application de la RD si c'est cochée
                let finalAmount = amount + (dr ? target.attributes.dr.value : 0);
                finalAmount = (finalAmount > 0 && dr ? 0 : finalAmount);
                
                hp.value += finalAmount;
                hp.value = (hp.value > hp.max ? hp.max : hp.value);
                hp.value = (hp.value < 0 ? 0 : hp.value);

                target.actor.update({"system.attributes.hp": hp});
            }
        }
    }

    static onClickChatMessageApplyButton(event, html, data){
        const btn = $(event.currentTarget);
        const btnType = btn.data("apply");
        const dmg = parseInt(html.find(".dice-total").text());
        const dr = html.find("#dr").is(":checked");
        switch(btnType){
            case "full"   : Hitpoints.applyToTargets(-dmg, dr); break;
            case "half"   : Hitpoints.applyToTargets(-Math.ceil(dmg/2), dr); break;
            case "double" : Hitpoints.applyToTargets(-dmg*2, dr); break;
            case "heal"   : Hitpoints.applyToTargets(dmg, false); break;
        }
    }
}