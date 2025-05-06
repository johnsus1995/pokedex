"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
});

export default function SearchForm({ types }: { types: string[] }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get('search') || '',
      type: searchParams.get('type') || 'all',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams);

    if (values.search) {
      params.set('search', values.search);
    } else {
      params.delete('search');
    }

    if (values.type && values.type !== 'all') {
      params.set('type', values.type);
    } else {
      params.delete('type');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  // Update form when URL params change
  useEffect(() => {
    form.reset({
      search: searchParams.get('search') || '',
      type: searchParams.get('type') || 'all',
    });
  }, [searchParams, form]);

  function clearFilters() {
    form.reset({ search: '', type: 'all' });
    replace(pathname);
  }

  const hasFilters = searchParams.get('search') || searchParams.get('type');

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className=" md:max-w-[700px] md:ml-auto">
        <div className="flex flex-col md:flex-row gap-4 my-4 ">

          {/* <Button
            variant="outline"
            size="icon"
            onClick={clearFilters}
            className={cn("md:self-start", {
              "invisible": !hasFilters,
            })}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear filters</span>
          </Button> */}

          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search Pokemon..."
                      className="pl-9"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="md:w-1/3">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.handleSubmit(onSubmit)();
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value="all">All types</SelectItem>
                    {types?.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}