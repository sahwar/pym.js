describe('pym', function() {
    var elements = [];

    beforeEach(function() {
        document.body.innerHTML = __html__['test/html-fixtures/autoinit_single_template.html'];
    });

    afterEach(function() {
        document.body.innerHTML = '';
        // Clean pymParent
        // pymParent.remove();
        // pymParent = null;
    });

    describe('test setup', function() {
        it('should expose the templates to __html__', function() {
            expect(document.getElementById('tpl')).not.toBeNull();
        });
    });

    describe('autoinit', function() {

        //TODO find a way to test autoinit on startup it seems that karma
        // is executing pym outside of this sandbox somehow so the document
        // that is viewed from inside the pym library has not the autoinit_template body.

        it('the auto init element should have id "auto-init-test1"', function() {
            var elements = window.pym.autoInit();
            expect(elements[0].id).toBe('auto-init-test1');
            expect(elements.length).toEqual(1);
        });

        it('the auto init should allow multiple instances', function() {
            document.body.innerHTML = __html__['test/html-fixtures/autoinit_multiple_template.html'];
            var elements = window.pym.autoInit();
            expect(elements.length).toEqual(3);
        });

        it('autoinit should mark as initialized all instances', function() {
            document.body.innerHTML = __html__['test/html-fixtures/autoinit_multiple_template.html'];
            var elements = window.pym.autoInit();
            var not_init = document.querySelectorAll('[data-pym-src]:not([data-pym-auto-initialized])').length;
            var inited = document.querySelectorAll('[data-pym-src]').length;
            expect(not_init).toEqual(0);
            expect(inited).toEqual(3);
        });

        it('autoinited instances should be accesible through its own variable', function() {
            document.body.innerHTML = __html__['test/html-fixtures/autoinit_multiple_template.html'];
            var elements = window.pym.autoInit();
            var instances = window.pym.autoInitInstances;
            expect(instances.length).toEqual(3);
            expect(elements).toEqual(instances);
        });

        it('it should clean an instance if removed if called on it', function() {
            document.body.innerHTML = __html__['test/html-fixtures/autoinit_multiple_template.html'];
            var elements = window.pym.autoInit();
            expect(elements.length).toEqual(3);
            elements[0].remove();
            expect(elements.length).toEqual(2);
        });

        xit('it should also clean an instance on autoInit if it has become an orphan iframe', function() {
            document.body.innerHTML = __html__['test/html-fixtures/autoinit_multiple_template.html'];
            var elements = window.pym.autoInit();
            expect(elements.length).toEqual(3);
            elements[0].el.getElementsByTagName('iframe')[0].contentWindow = null;
            elements = window.pym.autoInit();
            expect(elements.length).toEqual(2);
        });
    });
});
