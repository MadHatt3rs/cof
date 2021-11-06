/**
 * Override the default Initiative formula to customize special behaviors of the system.
 * Apply advantage, proficiency, or bonuses where appropriate
 * Apply the dexterity score as a decimal tiebreaker if requested
 * See Combat._getInitiativeFormula for more detail.
 * @returns {string}  Final initiative formula for the actor.
 */
export const _getInitiativeFormula = function() {
  const actor = this.actor;
  if ( !actor ) return "1d20";
  const actorData = actor.data.data;
  const actorType = actor.type;
  const init = actorData.attributes.init;
  const wis = actorData.stats.wis.value;


  // Construct initiative formula parts
  const parts = [
    init.value,
    (game.settings.get("cof", "useVarInit")) ? '1d6x' : null,
    (actorType == "encounter") ? null : wis/100,
    (init.malus !== 0) ? init.malus : null,
    (init.bonus !== 0) ? init.bonus : null
  ]

  

  return parts.filter(p => p !== null).join(" + ");
};
