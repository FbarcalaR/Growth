- [ ] extract common user check to common place
- [ ] get routine tasks only through routines. Routine should be the aggregate
- [ ] test all necessary endpoints are protected with user check
	- [ ] consider removing the RoutineTask dbset

- [x] get frontend rout from config file instead of a harcoded string in CORS policiy (check Program.cs)

Missing endpoints:
- [ ] No GET /routines (get all routines)
- [ ] No POST /routine-tasks/{id}/complete (complete task)
(When these are done: you can simply remove the queryFn mock implementations and the real API calls will work automatically.)