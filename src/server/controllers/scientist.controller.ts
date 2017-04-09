import { Cache } from '../db/redis';
import { Scientist } from '../models/scientist';
import { Scientist as AScientist } from '../../common/scientist';

export function ScientistController(app: any) {

    /**
     * Get scientists list.
     * @static
     */
    app.get('/scientist/list/:search*?',
        (req: any, res: any, next: any) => {
            Scientist.find({name:new RegExp(req.params.search, 'i')}, (err: Error, data: any) => {
                if (!err) {
                    res.json(data);
                } else {
                    console.error('faied to fetch');
                    res.statusCode = 404;
                }
            });
        });

    /**
     * Create / Update scientist
     *
     * @database
     */
    app.post('/scientist',
        (req: any, res: any, next: any) => {

            let data:AScientist = <AScientist>req.body,
                cb = (err:any, dbres:any) => {
                    if (err) {
                        console.error('failed to save');
                        res.statusCode = 400;
                    }
                    res.json({success:!err});
                };

            if (!!data.id)
                Scientist.update(data.id, data, cb);
            else
                Scientist.create(data, cb);
        });

    /**
     * Delete name.
     * @database
     */
    app.delete('/scientist/:id',
        (req: any, res: any, next: any) => {

            let id = req.params._id;
            Scientist.remove(id, (err:any) => {
                if (err) {
                    console.error('failed to save');
                    res.statusCode = 400;
                }
                res.json({success:!err});
            });
        });

}
