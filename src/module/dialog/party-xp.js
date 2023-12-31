export class FggPartyXP extends FormApplication {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["fgg", "dialog", "party-xp"],
            template: "systems/fgg/templates/apps/party-xp.html",
            width: 280,
            height: 400,
            resizable: false,
        });
    }

    /* -------------------------------------------- */

    /**
     * Add the Entity name into the window title
     * @type {String}
     */
    get title() {
        return game.i18n.localize("FGG.dialog.xp.deal");
    }

    /* -------------------------------------------- */

    /**
     * Construct and return the data object used to render the HTML template for this form application.
     * @return {Object}
     */
    getData() {
        const actors = this.object.documents.filter(e => e.data.type === "character" && e.data.flags.fgg && e.data.flags.fgg.party === true);
        let data = {
            actors: actors,
            data: this.object,
            config: CONFIG.FGG,
            user: game.user,
            settings: settings
        };
        return data;
    }

    _onDrop(event) {
        event.preventDefault();
        // WIP Drop Item Quantity
        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData("text/plain"));
            if (data.type !== "Item") return;
        } catch (err) {
            return false;
        }
    }
    /* -------------------------------------------- */

    _calculateShare(ev) {
        const actors = this.object.documents.filter(e => e.data.type === "character" && e.data.flags.fgg && e.data.flags.fgg.party === true);
        const toDeal = $(ev.currentTarget.parentElement).find('input[name="total"]').val();
        const html = $(this.form);
        let shares = 0;
        actors.forEach((a) => {
            shares += a.data.data.details.xp.share;
        });
        const value = parseFloat(toDeal) / shares;
        if (value) {
            actors.forEach(a => {
                html.find(`li[data-actor-id='${a.id}'] input`).val(Math.floor(a.data.data.details.xp.share * value));
            })
        }
    }

    _dealXP(ev) {
        const html = $(this.form);
        const rows = html.find('.actor');
        rows.each((_, row) => {
            const qRow = $(row);
            const value = qRow.find('input').val();
            const id = qRow.data('actorId');
            const actor = this.object.documents.find(e => e.id === id);
            actor.getExperience(Math.floor(parseInt(value)))
        })
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        html
            .find('button[data-action="calculate-share"')
            .click(this._calculateShare.bind(this));
        html
            .find('button[data-action="deal-xp"')
            .click(this._dealXP.bind(this));
    }
}
