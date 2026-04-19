// HIT-1.0 Spec Site — Schema Explorer
(function() {
  const SCHEMAS = {
    full: {
      hit_version: "1.0",
      node: {
        uid: "checkout.submit_btn",
        role: "action | input | navigation | container | view",
        intent: {
          domain: "commerce",
          action: "submit",
          object: "order",
          context: "checkout_flow"
        },
        hierarchy: {
          parent_id: "checkout.form_container",
          children: []
        },
        state: {
          status: "idle | busy | success | error",
          enabled: true,
          visible: true,
          value: null,
          errors: []
        },
        actions: [
          {
            name: "execute",
            params: {
              payment_method: "string",
              confirm_total: "number"
            },
            returns: "order_id",
            risk: "high"
          }
        ],
        metadata: {
          label: "Complete Purchase",
          description: "Finalizes the transaction and charges the saved card.",
          bounds: { x: 450, y: 200, w: 120, h: 40 }
        }
      }
    },
    intent: {
      intent: {
        domain: "commerce | productivity | navigation | general",
        action: "submit | create | delete | navigate | read | update | filter",
        object: "order | task | user | page | item | form | report",
        context: "optional_flow_identifier"
      }
    },
    state: {
      state: {
        status: "idle | busy | success | error",
        enabled: true,
        visible: true,
        value: "current_field_value_or_null",
        errors: ["Validation error messages..."]
      }
    },
    actions: {
      actions: [
        {
          name: "execute",
          params: {
            param_name: "param_type (string | number | boolean)"
          },
          returns: "return_type_description",
          risk: "low | medium | high",
          handler: "Function — registered in-app, not serialized"
        }
      ]
    }
  };

  function syntaxHighlight(obj) {
    const json = JSON.stringify(obj, null, 2);
    return json
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"([\w.| ]+)":/g, '<span class="key">"$1"</span>:')
      .replace(/: "(.*?)"/g, ': <span class="str">"$1"</span>')
      .replace(/: (true|false)/g, ': <span class="kw">$1</span>')
      .replace(/: (null)/g, ': <span class="num">$1</span>')
      .replace(/: (\d+(?:\.\d+)?)/g, ': <span class="num">$1</span>');
  }

  function renderSchema(tab) {
    const el = document.getElementById('schema-content');
    if (el) el.innerHTML = syntaxHighlight(SCHEMAS[tab] || SCHEMAS.full);
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderSchema('full');
    const tabs = document.querySelectorAll('.schema-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        renderSchema(tab.getAttribute('data-tab'));
      });
    });
  });
})();
